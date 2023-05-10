import { memo } from 'react';
import { useStore } from 'effector-react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';

import { useMediaQuery } from '../../../hooks';
import { Paths } from '../../../constants';
import { ModeToggler, SearchInput, SearchSvg } from '../../elements';
import { CartPopup } from '../CartPopup';

import cls from './HeaderBottom.module.scss';

export const HeaderBottom = memo(() => {
  const isMedia950 = useMediaQuery(950);
  // const mode = useStore($mode);
  const mode = 'light';
  const darkModeClass = mode === 'dark' ? `${cls.dark_mode}` : '';

  return (
    <div className={cls.header__bottom}>
      <div className={clsx('container', cls.header__bottom__container)}>
        <h1 className={cls.header__logo}>
          <Link href={Paths.DASHBOARD} legacyBehavior passHref>
            <a className={cls.header__logo__link}>
              <Image src="/img/logo.svg" alt="logo" />

              <span
                className={clsx(darkModeClass, cls.header__logo__link__text)}
              >
                Детали для газовых котлов
              </span>
            </a>
          </Link>
        </h1>
        <div className={cls.header__search}>
          <SearchInput />

          <button className={clsx(darkModeClass, cls.header__search__btn)}>
            <span className={cls.header__search__btn__span}>
              <SearchSvg />
            </span>
          </button>
        </div>

        <div className={cls.header__shopping_cart}>
          {!isMedia950 && <ModeToggler />}
          {/* <CartPopup /> */}
        </div>
      </div>
    </div>
  );
});
