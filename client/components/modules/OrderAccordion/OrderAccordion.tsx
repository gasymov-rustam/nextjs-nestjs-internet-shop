import clsx from 'clsx';
import { useStore } from 'effector-react';
import { AnimatePresence, motion } from 'framer-motion';
import { memo, useState } from 'react';

import { $shoppingCart, $totalPrice } from '../../../context/shoppingCart';
import { useMediaQuery, useTheme } from '../../../hooks';
import { formatPrice } from '../../../utils';
import { DoneSvg, EditSvg } from '../../elements';
import { CartPopupItem } from '../CartPopupItem';
import { OrderItem } from '../OrderItem';

import cls from '@/components/templates/OrderPage/OrderPage.module.scss';

interface OrderAccordionProps {
  showDoneIcon: boolean;
  setOrderIsReady: (arg: boolean) => void;
}

export const OrderAccordion = memo(
  ({ showDoneIcon, setOrderIsReady }: OrderAccordionProps) => {
    const [expanded, setExpanded] = useState(false);
    const shoppingCart = useStore($shoppingCart);
    const totalPrice = useStore($totalPrice);
    const isMedia550 = useMediaQuery(550);
    const { mode } = useTheme();
    const darkModeClass = { [cls.dark_mode]: mode === 'dark' };

    const openAccordion = () => {
      setOrderIsReady(false);
      setExpanded(true);
    };
    const closeAccordion = () => {
      setOrderIsReady(true);
      setExpanded(false);
    };

    return (
      <>
        <motion.div
          initial={false}
          className={clsx(cls.order__cart__title, darkModeClass)}
        >
          <h3 className={clsx(cls.order__cart__title__text, darkModeClass)}>
            {showDoneIcon && (
              <span>
                <DoneSvg />
              </span>
            )}
            Cart
          </h3>

          <button
            className={cls.order__cart__title__btn}
            onClick={openAccordion}
          >
            <span>
              <EditSvg />
            </span>

            {isMedia550 ? '' : 'Edit'}
          </button>
        </motion.div>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="content"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: 'auto' },
                collapsed: { opacity: 0, height: 0 },
              }}
              style={{ overflow: 'hidden' }}
              transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
            >
              <div className={clsx(cls.order__cart__content, darkModeClass)}>
                <ul className={cls.order__cart__list}>
                  {shoppingCart.length ? (
                    shoppingCart.map((item) =>
                      isMedia550 ? (
                        <CartPopupItem key={item.id} item={item} />
                      ) : (
                        <OrderItem item={item} key={item.id} />
                      )
                    )
                  ) : (
                    <li className={cls.order__cart__empty}>
                      <span
                        className={clsx(
                          cls.order__cart__empty__text,
                          darkModeClass
                        )}
                      >
                        Cart is empty
                      </span>
                    </li>
                  )}
                </ul>

                <div className={cls.order__cart__footer}>
                  <div className={cls.order__cart__footer__total}>
                    <span
                      className={clsx(
                        cls.order__cart__footer__text,
                        darkModeClass
                      )}
                    >
                      Total order amount:
                    </span>

                    <span className={cls.order__cart__footer__price}>
                      {formatPrice(totalPrice)} P
                    </span>
                  </div>

                  <button
                    className={cls.order__cart__footer__btn}
                    onClick={closeAccordion}
                    disabled={!shoppingCart.length}
                  >
                    Continue to
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }
);
