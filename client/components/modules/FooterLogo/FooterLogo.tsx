import { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Paths } from '../../../constants';

import cls from './FooterLogo.module.scss';

export const FooterLogo = memo(() => (
  <div className={cls.footer}>
    <Link href={Paths.DASHBOARD} passHref legacyBehavior>
      <a className={cls.footer__logo}>
        <Image src="/img/logo-footer.svg" alt="logo" />

        <span className={cls.footer__logo__text}>
          Детали для газовых котлов
        </span>
      </a>
    </Link>
  </div>
));
