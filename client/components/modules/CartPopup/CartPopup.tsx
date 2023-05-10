import { forwardRef, useCallback, useEffect } from 'react';
import { useStore } from 'effector-react';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Link from 'next/link';

import { getCartItemsFx } from '../../../app';
import { ShoppingCartSvg } from '../../elements';
import { CartPopupItem } from '../CartPopupItem';
import { Paths } from '../../../constants';

import cls from './CartPopup.module.scss';

interface CartPopupProps {
  open: boolean;
  setOpen: (arg: boolean) => void;
}

export const CartPopup = forwardRef<HTMLDivElement, CartPopupProps>(
  ({ open, setOpen }, ref) => {
    // const mode = useStore($mode);
    const mode = 'dark';
    // const user = useStore($user);
    const user = undefined;
    // const shoppingCart = useStore($shoppingCart);
    const shoppingCart: unknown[] = [];
    const darkModeClass = mode === 'dark' ? `${cls.dark_mode}` : '';

    const toggleCartDropDown = () => setOpen(!open);

    const loadCartItems = useCallback(async () => {
      try {
        // const cartItems = await getCartItemsFx(`/shopping-cart/${user.userId}`);
        // setShoppingCart(cartItems);
      } catch (error) {
        toast.error((error as Error).message);
      }
    }, []);

    useEffect(() => {
      loadCartItems();
    }, [loadCartItems]);

    return (
      <div className={cls.cart} ref={ref}>
        <button
          className={`${cls.cart__btn} ${darkModeClass}`}
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
              className={`${cls.cart__popup} ${darkModeClass}`}
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
                      className={`${cls.cart__popup__empty__text} ${darkModeClass}`}
                    >
                      Cart is empty
                    </span>
                  </li>
                )}
              </ul>
              <div className={cls.cart__popup__footer}>
                <div className={cls.cart__popup__footer__total}>
                  <span
                    className={`${cls.cart__popup__footer__text} ${darkModeClass}`}
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
  }
);
