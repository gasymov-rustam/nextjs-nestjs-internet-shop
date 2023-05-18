import { memo, useState } from 'react';

import { useTheme } from '../../../hooks';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import cls from './ShippingPayment.module.scss';
import { tab1Text, tab2Text, tab3Text, tab4Text } from './mockData';

export const ShippingPayment = memo(() => {
  const [tab1, setTab1] = useState(true);
  const [tab2, setTab2] = useState(false);
  const [tab3, setTab3] = useState(false);
  const [tab4, setTab4] = useState(false);
  const { mode } = useTheme();
  const darkModeClass = { [cls.dark_mode]: mode === 'dark' };

  const handleTab1 = () => {
    setTab1(true);
    setTab2(false);
    setTab3(false);
    setTab4(false);
  };

  const handleTab2 = () => {
    setTab1(false);
    setTab2(true);
    setTab3(false);
    setTab4(false);
  };

  const handleTab3 = () => {
    setTab1(false);
    setTab2(false);
    setTab3(true);
    setTab4(false);
  };

  const handleTab4 = () => {
    setTab1(false);
    setTab2(false);
    setTab3(false);
    setTab4(true);
  };

  return (
    <section className={cls.shipping_payment}>
      <div className="container">
        <h2 className={clsx(cls.shipping_payment__title, darkModeClass)}>
          Shipping and Payment
        </h2>

        <div className={clsx(cls.shipping_payment__tabs, darkModeClass)}>
          <ul className={cls.shipping_payment__tabs__controls}>
            <li
              className={clsx(
                cls.shipping_payment__tabs__controls__item,
                { [cls.active]: tab1 },
                darkModeClass
              )}
            >
              <button className={clsx(darkModeClass)} onClick={handleTab1}>
                How does courier delivery work?
              </button>
            </li>

            <li
              className={clsx(
                cls.shipping_payment__tabs__controls__item,
                { [cls.active]: tab2 },
                darkModeClass
              )}
            >
              <button className={clsx(darkModeClass)} onClick={handleTab2}>
                How do I get the goods from the pickup point?
              </button>
            </li>

            <li
              className={clsx(
                cls.shipping_payment__tabs__controls__item,
                { [cls.active]: tab3 },
                darkModeClass
              )}
            >
              <button className={clsx(darkModeClass)} onClick={handleTab3}>
                What are the payment methods?
              </button>
            </li>

            <li
              className={clsx(
                cls.shipping_payment__tabs__controls__item,
                { [cls.active]: tab4 },
                darkModeClass
              )}
            >
              <button className={clsx(darkModeClass)} onClick={handleTab4}>
                How do I know the status of my order?
              </button>
            </li>
          </ul>

          <div
            className={`${cls.shipping_payment__tabs__content} ${darkModeClass}`}
          >
            {tab1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={cls.shipping_payment__tabs__content__text}
              >
                {tab1Text}
              </motion.div>
            )}

            {tab2 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={cls.shipping_payment__tabs__content__text}
              >
                {tab2Text}
              </motion.p>
            )}

            {tab3 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={cls.shipping_payment__tabs__content__text}
              >
                {tab3Text}
              </motion.p>
            )}

            {tab4 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={cls.shipping_payment__tabs__content__text}
              >
                {tab4Text}
              </motion.p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
});
