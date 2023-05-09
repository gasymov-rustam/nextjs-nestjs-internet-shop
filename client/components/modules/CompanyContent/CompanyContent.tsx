import { memo } from 'react';
import Link from 'next/link';

import cls from './CompanyContent.module.scss';
import { Paths } from '../../../constants';

export const CompanyContent = memo(() => (
  <ul className={cls.list}>
    <li className={cls.list__item}>
      <Link href={Paths.ABOUT} passHref legacyBehavior>
        <a className={cls.list__item_link}>About Company</a>
      </Link>
    </li>

    <li className={cls.__item}>
      <Link href={Paths.CONTACTS} passHref legacyBehavior>
        <a className={cls.__item_link}>Callback</a>
      </Link>
    </li>

    <li className={cls.__item}>
      <Link href={Paths.WHOLESALE_BUYERS} passHref legacyBehavior>
        <a className={cls.__item_link}>Sales</a>
      </Link>
    </li>

    <li className={cls.__item}>
      <Link href={Paths.CONTACTS} passHref legacyBehavior>
        <a className={cls.__item_link}>Contacts</a>
      </Link>
    </li>
  </ul>
));
