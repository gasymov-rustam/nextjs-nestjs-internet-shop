import Link from 'next/link';
import { memo } from 'react';

import { Paths } from '../../../constants';

import cls from './OnlineStoreContent.module.scss';

export const OnlineStoreContent = memo(() => (
  <ul className={cls.footer}>
    <li className={cls.footer__item}>
      <Link href={Paths.CATALOG} passHref legacyBehavior>
        <a className={cls.footer__item__link}>Catalog</a>
      </Link>
    </li>

    <li className={cls.footer__item}>
      <Link href={Paths.SHIPPING_PAYMENT} passHref legacyBehavior>
        <a className={cls.footer__item__link}>Shipping and Payment</a>
      </Link>
    </li>
  </ul>
));
