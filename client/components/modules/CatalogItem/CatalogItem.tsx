import clsx from 'clsx';
import Link from 'next/link';
import { memo, useState } from 'react';

import { useStore } from 'effector-react';
import { Paths } from '../../../constants';
import { $shoppingCart } from '../../../context/shoppingCart';
import { $user } from '../../../context/user';
import { useTheme } from '../../../hooks';
import { formatPrice, toggleCartItem } from '../../../utils';
import { CartHoverCheckedSvg, CartHoverSvg, Spinner } from '../../elements';

import type { IBoilerPart } from '../../../types';

import cls from '@/components/templates/CatalogContent/CatalogContent.module.scss';

export const CatalogItem = memo(({ item }: { item: IBoilerPart }) => {
  const { mode } = useTheme();
  const user = useStore($user);
  const [spinner, setSpinner] = useState(false);
  const shoppingCart = useStore($shoppingCart);
  const isInCart = shoppingCart.some((cartItem) => cartItem.partId === item.id);
  const darkModeClass = { [cls.dark_mode]: mode === 'dark' };

  const toggleToCart = () => {
    if (user) {
      toggleCartItem(user.username, item.id, isInCart, setSpinner);
    }
  };

  return (
    <li className={clsx(cls.catalog__list__item, darkModeClass)}>
      <img src={JSON.parse(item.images)[0]} alt={item.name} />

      <div className={cls.catalog__list__item__inner}>
        <Link href={`${Paths.CATALOG}/${item.id}`} passHref legacyBehavior>
          <h3 className={cls.catalog__list__item__title}>{item.name}</h3>
        </Link>

        <span className={cls.catalog__list__item__code}>
          Article: {item.vendor_code}
        </span>

        <span className={cls.catalog__list__item__price}>
          {formatPrice(item.price)} P
        </span>
      </div>

      <button
        className={clsx(cls.catalog__list__item__cart, {
          [cls.added]: isInCart,
        })}
        disabled={spinner}
        onClick={toggleToCart}
      >
        {spinner ? (
          <Spinner mode={mode} style={{ top: 6, left: 6 }} />
        ) : (
          <span>{isInCart ? <CartHoverCheckedSvg /> : <CartHoverSvg />}</span>
        )}
      </button>
    </li>
  );
});
