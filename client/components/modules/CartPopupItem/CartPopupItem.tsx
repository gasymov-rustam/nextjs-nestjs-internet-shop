import clsx from 'clsx';
import Link from 'next/link';
import { memo } from 'react';

import { Paths } from '../../../constants';
import { usePrice, useTheme } from '../../../hooks';
import { formatPrice } from '../../../utils';
import { CartItemCounter, DeleteSvg, Spinner } from '../../elements';

import type { IShoppingCartItem } from '../../../types';

import cls from './CartPopupItem.module.scss';

interface CartPopupItemProps {
  item: IShoppingCartItem;
}

export const CartPopupItem = memo(({ item }: CartPopupItemProps) => {
  const { mode } = useTheme();
  const darkModeClass = { [cls.dark_mode]: mode === 'dark' };

  const { price, spinner, decreasePrice, deleteCartItem, increasePrice } =
    usePrice(item.count, item.partId, item.price);

  return (
    <li className={cls.cart__item}>
      <div className={cls.cart__item__top}>
        <div className={cls.cart__item__img}>
          <img src={item.image} alt={item.name} />
        </div>

        <Link href={`${Paths.CATALOG}/${item.partId}`} passHref legacyBehavior>
          <a className={clsx(cls.cart__item__text, darkModeClass)}>
            <span>
              {item.name.replace('.', '')}, {item.parts_manufacturer},
              {item.boiler_manufacturer}
            </span>
          </a>
        </Link>

        <button onClick={deleteCartItem}>
          <span>
            {spinner ? (
              <Spinner
                mode={mode}
                style={{ top: 0, left: 0, width: 20, height: 20 }}
              />
            ) : (
              <DeleteSvg />
            )}
          </span>
        </button>
      </div>

      <div className={cls.cart__item__bottom}>
        {item.in_stock === 0 ? (
          <span className={cls.cart__item__empty}>Not in stock</span>
        ) : (
          <CartItemCounter
            totalCount={item.in_stock}
            partId={item.partId}
            initialCount={item.count}
            increasePrice={increasePrice}
            decreasePrice={decreasePrice}
          />
        )}

        <span className={clsx(cls.cart__item__price, darkModeClass)}>
          {formatPrice(price)} $
        </span>
      </div>
    </li>
  );
});
