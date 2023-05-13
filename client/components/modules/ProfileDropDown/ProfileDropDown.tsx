import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { forwardRef } from 'react';

import { logoutFx } from '../../../app';
import { Paths, RequestsPath } from '../../../constants';
import { useTheme } from '../../../hooks';
import { LogoutSvg, ProfileSvg } from '../../elements';

import cls from './ProfileDropDown.module.scss';

interface ProfileDropDownProps {
  open: boolean;
  setOpen: (arg0: boolean) => void;
}

export const ProfileDropDown = forwardRef<HTMLDivElement, ProfileDropDownProps>(
  ({ open, setOpen }, ref) => {
    const { mode } = useTheme();
    // const user = undefined;
    const router = useRouter();
    const darkModeClass = mode === 'dark' ? cls.dark_mode : '';

    const toggleProfileDropDown = () => setOpen(!open);

    const handleLogout = async () => {
      await logoutFx(RequestsPath.LOGOUT);
      router.push(Paths.HOME);
    };

    return (
      <div className={cls.profile} ref={ref}>
        <button className={cls.profile__btn} onClick={toggleProfileDropDown}>
          <span className={cls.profile__span}>
            <ProfileSvg />
          </span>
        </button>

        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className={clsx(cls.profile__dropdown, darkModeClass)}
              style={{ transformOrigin: 'right top' }}
            >
              <li className={cls.profile__dropdown__user}>
                <span
                  className={clsx(
                    cls.profile__dropdown__username,
                    darkModeClass
                  )}
                >
                  {/* {user.username} */}
                  hhhhhhhh
                </span>

                <span
                  className={clsx(cls.profile__dropdown__email, darkModeClass)}
                >
                  {/* {user.email} */}
                  email
                </span>
              </li>

              <li className={cls.profile__dropdown__item}>
                <button
                  className={cls.profile__dropdown__item__btn}
                  onClick={handleLogout}
                >
                  <span
                    className={clsx(
                      cls.profile__dropdown__item__text,
                      darkModeClass
                    )}
                  >
                    Log Out
                  </span>
                  <span
                    className={clsx(
                      cls.profile__dropdown__item__svg,
                      darkModeClass
                    )}
                  >
                    <LogoutSvg />
                  </span>
                </button>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
