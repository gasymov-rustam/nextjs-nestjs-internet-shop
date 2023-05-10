import { memo, useState } from 'react';
import { useStore } from 'effector-react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

import { DeleteSvg } from '../../elements';
import { formatPrice, removeItemFromCart } from '../../../utils';

import type { IShoppingCartItem } from '../../../types';

import cls from './CartPopupItem.module.scss';
import { Paths } from '../../../constants';

interface CartPopupItemProps {
  item: IShoppingCartItem;
}

export const CartPopupItem = memo(({ item }: CartPopupItemProps) => {
  // const mode = useStore($mode);
  const mode = 'light';
  const darkModeClass = mode === 'dark' ? `${cls.dark_mode}` : '';
  const spinnerDarkModeClass = mode === 'dark' ? `${cls.cart__dark_mode}` : '';
  const [spinner, setPinner] = useState(false);

  const deleteCartItem = () => removeItemFromCart(item.partId, setPinner);

  return (
    <li className={cls.cart__item}>
      <div className={cls.cart__item__top}>
        <div className={cls.cart__item__img}>
          <Image src={item.image} alt={item.name} />
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
              <span
                className={clsx(cls.spinner, spinnerDarkModeClass)}
                style={{ top: 0, left: 0, width: 20, height: 20 }}
              />
            ) : (
              <DeleteSvg />
            )}
          </span>
        </button>
      </div>

      <div className={cls.cart__item__bottom}>
        {item.in_stock === 0 && (
          <span className={cls.cart__item__empty}>Not in stock</span>
        )}

        <span className={clsx(cls.cart__item__price, darkModeClass)}>
          {formatPrice(item.price)} P
        </span>
      </div>
    </li>
  );
});