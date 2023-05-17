import clsx from 'clsx';
import { useStore } from 'effector-react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { forwardRef, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';

import { withClickOutside } from '../../../HOCs';
import { Paths, RequestsPath } from '../../../constants';
import { $shoppingCart, setShoppingCart } from '../../../context/shoppingCart';
import { useTheme } from '../../../hooks';
import { ShoppingCartSvg } from '../../elements';
import { CartPopupItem } from '../CartPopupItem';

import { getCartItemsFx } from '../../../app';
import cls from './CartPopup.module.scss';
import { $user } from '../../../context/user';

interface CartPopupProps {
  open: boolean;
  setOpen: (arg: boolean) => void;
}

export const CartPopup = withClickOutside(
  forwardRef<HTMLDivElement, CartPopupProps>(({ open, setOpen }, ref) => {
    const { mode } = useTheme();
    const user = useStore($user);
    const shoppingCart = useStore($shoppingCart);
    const darkModeClass = { [cls.dark_mode]: mode === 'dark' };

    const toggleCartDropDown = () => setOpen(!open);

    const loadCartItems = useCallback(async () => {
      if (!user) return;

      try {
        const cartItems = await getCartItemsFx(`${RequestsPath.SHOPPING_CART}/${user.userId}`);
        setShoppingCart(cartItems);
      } catch (error) {
        toast.error((error as Error).message);
      }
    }, [user]);

    useEffect(() => {
      loadCartItems();
    }, [loadCartItems]);

    return (
      <div className={cls.cart} ref={ref}>
        <button
          className={clsx(cls.cart__btn, darkModeClass)}
          onClick={toggleCartDropDown}
        >
          {!!shoppingCart.length && (
            <span className={cls.cart__btn__count}>{shoppingCart.length}</span>
          )}

          <span className={cls.cart__svg}>
            <ShoppingCartSvg />
          </span>
          <span className={cls.cart__text}>Cart</span>
        </button>

        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className={clsx(cls.cart__popup, darkModeClass)}
              style={{ transformOrigin: 'right top' }}
            >
              <h3 className={cls.cart__popup__title}>Cart</h3>

              <ul className={cls.cart__popup__list}>
                {shoppingCart.length ? (
                  shoppingCart.map((item) => (
                    <CartPopupItem key={item.id} item={item} />
                  ))
                ) : (
                  <li className={cls.cart__popup__empty}>
                    <span
                      className={clsx(
                        cls.cart__popup__empty__text,
                        darkModeClass
                      )}
                    >
                      Cart is empty
                    </span>
                  </li>
                )}
              </ul>
              <div className={cls.cart__popup__footer}>
                <div className={cls.cart__popup__footer__total}>
                  <span
                    className={clsx(
                      cls.cart__popup__footer__text,
                      darkModeClass
                    )}
                  >
                    Total price:
                  </span>

                  <span className={cls.cart__popup__footer__price}>0</span>
                </div>

                <Link href={Paths.ORDER} passHref legacyBehavior>
                  <button
                    className={cls.cart__popup__footer__btn}
                    disabled={!shoppingCart.length}
                  >
                    Send order
                  </button>
                </Link>
              </div>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    );
  })
);
