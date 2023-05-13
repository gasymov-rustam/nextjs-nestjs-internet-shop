import clsx from 'clsx';
import Link from 'next/link';
import { memo } from 'react';

import { Paths } from '../../../constants';
import { useMediaQuery, useTheme } from '../../../hooks';
import { CityButton, ModeToggler } from '../../elements';

import cls from './HeaderTop.module.scss';

export const HeaderTop = memo(() => {
  const isMedia950 = useMediaQuery(950);
  // const { toggleOpen, open, closePopup } = usePopup();
  const { mode } = useTheme();
  const darkModeClass = mode === 'dark' ? cls.dark_mode : '';

  return (
    <div className={cls.header__top}>
      <div className={clsx('container', cls.header__top__container)}>
        {!isMedia950 && <CityButton />}

        {isMedia950 && (
          <button
            // onClick={toggleOpen}
            className={clsx(cls.burger_menu, darkModeClass, {
              [cls.open]: open,
            })}
          >
            <span />
            <span />
            <span />
          </button>
        )}

        <nav
          className={clsx(cls.burger_menu, darkModeClass, {
            [cls.open]: open,
          })}
        >
          <ul className={cls.header__nav__list}>
            <li className={cls.header__nav__list__item}>
              <Link href={Paths.SHOPPING_PAYMENT} passHref legacyBehavior>
                <a
                  className={clsx(
                    cls.header__nav__list__item__link,
                    darkModeClass
                  )}
                  // onClick={closePopup}
                >
                  Orders and payment
                </a>
              </Link>
            </li>

            <li className={cls.header__nav__list__item}>
              <Link href={Paths.ABOUT} passHref legacyBehavior>
                <a
                  className={clsx(
                    cls.header__nav__list__item__link,
                    darkModeClass
                  )}
                  // onClick={closePopup}
                >
                  About company
                </a>
              </Link>
            </li>

            <li className={cls.header__nav__list__item}>
              <Link href={Paths.CATALOG} passHref legacyBehavior>
                <a
                  className={clsx(
                    cls.header__nav__list__item__link,
                    darkModeClass
                  )}
                  // onClick={closePopup}
                >
                  Catalog
                </a>
              </Link>
            </li>

            <li className={cls.header__nav__list__item}>
              <Link href={Paths.CONTACTS} passHref legacyBehavior>
                <a
                  className={clsx(
                    cls.header__nav__list__item__link,
                    darkModeClass
                  )}
                  // onClick={closePopup}
                >
                  Contacts
                </a>
              </Link>
            </li>

            <li className={cls.header__nav__list__item}>
              <Link href={Paths.WHOLESALE_BUYERS} passHref legacyBehavior>
                <a
                  className={clsx(
                    cls.header__nav__list__item__link,
                    darkModeClass
                  )}
                  // onClick={closePopup}
                >
                  Wholesale byers
                </a>
              </Link>
            </li>

            {isMedia950 && (
              <li className={cls.header__nav__list__item}>
                <CityButton />
              </li>
            )}

            {isMedia950 && (
              <li className={cls.header__nav__list__item}>
                <ModeToggler />
              </li>
            )}
          </ul>
        </nav>

        {/* <ProfileDropdown /> */}
      </div>
    </div>
  );
});
