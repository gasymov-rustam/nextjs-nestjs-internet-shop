import { memo, useState } from 'react';

import { useTheme } from '../../../hooks';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import cls from './ShippingPayment.module.scss';
import { tab1Text, tab2Text, tab3Text, tab4Text } from './mockData';

interface Tab {
  id: number;
  title: string;
  description: string;
}

const mockTabs: Tab[] = [
  {
    id: 1,
    title: 'How does courier delivery work?',
    description: tab1Text,
  },
  {
    id: 2,
    title: 'How do I get the goods from the pickup point?',
    description: tab2Text,
  },
  {
    id: 3,
    title: 'What are the payment methods?',
    description: tab3Text,
  },
  {
    id: 4,
    title: 'What are the payment methods?',
    description: tab4Text,
  },
];

export const ShippingPayment = memo(() => {
  const [tab, setTab] = useState<Tab>(mockTabs[0]);
  const { mode } = useTheme();
  const darkModeClass = { [cls.dark_mode]: mode === 'dark' };

  const handleChange = (tab: Tab) => () => {
    setTab(tab);
  };

  return (
    <section className={cls.shipping_payment}>
      <div className="container">
        <h2 className={clsx(cls.shipping_payment__title, darkModeClass)}>
          Shipping and Payment
        </h2>

        <div className={clsx(cls.shipping_payment__tabs, darkModeClass)}>
          <ul className={cls.shipping_payment__tabs__controls}>
            {mockTabs.map((item) => (
              <li
                key={item.id}
                className={clsx(
                  cls.shipping_payment__tabs__controls__item,
                  { [cls.active]: tab.id === item.id },
                  darkModeClass
                )}
              >
                <button
                  className={clsx(darkModeClass)}
                  onClick={handleChange(item)}
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ul>

          <div
            className={`${cls.shipping_payment__tabs__content} ${darkModeClass}`}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={cls.shipping_payment__tabs__content__text}
            >
              {tab.description}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
});
