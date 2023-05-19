import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo, useEffect } from 'react';

import { Paths } from '../../../constants';
import { setDisableCart } from '../../../context/shoppingCart';
import { useMediaQuery, useTheme } from '../../../hooks';
import { ModeToggler, SearchInput } from '../../elements';
import { CartPopup } from '../CartPopup';

import cls from './HeaderBottom.module.scss';

export const HeaderBottom = memo(() => {
  const isMedia950 = useMediaQuery(950);
  const { mode } = useTheme();
  const darkModeClass = { [cls.dark_mode]: mode === 'dark' };
  const router = useRouter();

  useEffect(() => {
    setDisableCart(router.pathname === Paths.ORDER);
  }, [router.pathname]);

  return (
    <div className={cls.header__bottom}>
      <div className={clsx('container', cls.header__bottom__container)}>
        <h1 className={cls.header__logo}>
          <Link href={Paths.DASHBOARD} legacyBehavior passHref>
            <a className={cls.header__logo__link}>
              <img src="/img/logo.svg" alt="logo" />

              <span
                className={clsx(darkModeClass, cls.header__logo__link__text)}
              >
                Details for gas boilers
              </span>
            </a>
          </Link>
        </h1>

        <div className={cls.header__search}>
          <SearchInput />
        </div>

        <div className={cls.header__shopping_cart}>
          {!isMedia950 && <ModeToggler />}
          <CartPopup />
        </div>
      </div>
    </div>
  );
});
