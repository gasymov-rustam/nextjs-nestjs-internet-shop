import Link from 'next/link';
import { memo } from 'react';

import { Paths } from '../../../constants';
import cls from './CompanyContent.module.scss';

export const CompanyContent = memo(() => (
  <ul className={cls.list}>
    <li className={cls.list__item}>
      <Link href={Paths.ABOUT} passHref legacyBehavior>
        <a className={cls.list__item_link}>About Company</a>
      </Link>
    </li>

    <li className={cls.list__item}>
      <Link href={Paths.CONTACTS} passHref legacyBehavior>
        <a className={cls.list__item_link}>Callback</a>
      </Link>
    </li>

    <li className={cls.list__item}>
      <Link href={Paths.WHOLESALE_BUYERS} passHref legacyBehavior>
        <a className={cls.list__item_link}>Sales</a>
      </Link>
    </li>

    <li className={cls.list__item}>
      <Link href={Paths.CONTACTS} passHref legacyBehavior>
        <a className={cls.list__item_link}>Contacts</a>
      </Link>
    </li>
  </ul>
));
