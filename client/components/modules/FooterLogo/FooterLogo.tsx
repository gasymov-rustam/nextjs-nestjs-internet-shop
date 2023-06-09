import Link from 'next/link';
import { memo } from 'react';

import { Paths } from '../../../constants';

import cls from './FooterLogo.module.scss';

export const FooterLogo = memo(() => (
  <div className={cls.footer}>
    <Link href={Paths.DASHBOARD} passHref legacyBehavior>
      <a className={cls.footer__logo}>
        <img src="/img/logo-footer.svg" alt="logo" />

        <span className={cls.footer__logo__text}>Details for gas boilers</span>
      </a>
    </Link>
  </div>
));
