import clsx from 'clsx';
import Link from 'next/link';
import { memo } from 'react';

import { Paths } from '../../../constants';
import { useMediaQuery, usePrice, useTheme } from '../../../hooks';
import { formatPrice } from '../../../utils';
import { CartItemCounter, Spinner } from '../../elements';

import type { IShoppingCartItem } from '../../../types';

import cls from '@/components/templates/OrderPage/OrderPage.module.scss';

interface OrderItemProps {
  item: IShoppingCartItem;
}

export const OrderItem = memo(({ item }: OrderItemProps) => {
  const { mode } = useTheme();
  const isMedia1160 = useMediaQuery(1160);
  const darkModeClass = { [cls.dark_mode]: mode === 'dark' };
  const { price, spinner, decreasePrice, deleteCartItem, increasePrice } =
    usePrice(item.count, item.partId, item.price);

  return (
    <li className={cls.order__cart__list__item}>
      <div className={cls.order__cart__list__item__left}>
        <div className={cls.order__cart__list__item__left__inner}>
          <div className={cls.order__cart__list__item__img}>
            <img src={item.image} alt={item.name} />
          </div>

          <Link
            href={`${Paths.CATALOG}/${item.partId}`}
            passHref
            legacyBehavior
          >
            <a
              className={clsx(cls.order__cart__list__item__text, darkModeClass)}
            >
              <span>
                {item.name.replace('.', '')}, {item.parts_manufacturer},
                {item.boiler_manufacturer}
              </span>
            </a>
          </Link>
        </div>

        {isMedia1160 &&
          (item.in_stock === 0 ? (
            <span className={cls.order__cart__list__item__empty}>
              Not in stock
            </span>
          ) : (
            <CartItemCounter
              totalCount={item.in_stock}
              partId={item.partId}
              initialCount={item.count}
              increasePrice={increasePrice}
              decreasePrice={decreasePrice}
            />
          ))}
      </div>

      <div className={cls.order__cart__list__item__right}>
        {!isMedia1160 &&
          (item.in_stock === 0 ? (
            <span className={cls.order__cart__list__item__empty}>
              Not in stock
            </span>
          ) : (
            <CartItemCounter
              totalCount={item.in_stock}
              partId={item.partId}
              initialCount={item.count}
              increasePrice={increasePrice}
              decreasePrice={decreasePrice}
            />
          ))}

        <span
          className={clsx(cls.order__cart__list__item__price, darkModeClass)}
        >
          {formatPrice(price)} P
        </span>

        <button
          className={cls.order__cart__list__item__delete}
          onClick={deleteCartItem}
        >
          {spinner ? (
            <Spinner
              mode={mode}
              style={{ top: '-13px', left: '-30px', width: 25, height: 25 }}
            />
          ) : (
            'Remove'
          )}
        </button>
      </div>
    </li>
  );
});
