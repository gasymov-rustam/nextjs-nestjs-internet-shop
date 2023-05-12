import clsx from 'clsx';
import { MutableRefObject, memo, useRef } from 'react';

import { useMediaQuery } from '../../../hooks';
import { ModeToggler } from '../../elements';
import { SignInForm, SignUpForm } from '../../modules';

import cls from './Auth.module.scss';

export const Auth = memo(() => {
  const isMedia800 = useMediaQuery(800);
  const switchCtn = useRef() as MutableRefObject<HTMLDivElement>;
  const switchC1 = useRef() as MutableRefObject<HTMLDivElement>;
  const switchC2 = useRef() as MutableRefObject<HTMLDivElement>;
  const switchCircle1 = useRef() as MutableRefObject<HTMLDivElement>;
  const switchCircle2 = useRef() as MutableRefObject<HTMLDivElement>;
  const aContainer = useRef() as MutableRefObject<HTMLDivElement>;
  const bContainer = useRef() as MutableRefObject<HTMLDivElement>;
  // const mode = useStore($mode);
  const mode = 'dark';
  const darkModeClass = mode === 'dark' ? `${cls.dark_mode}` : '';

  const switchForm = () => {
    switchCtn.current.classList.add(cls.is_gx);

    setTimeout(() => switchCtn.current.classList.remove(cls.is_gx), 1500);

    switchCtn.current.classList.toggle(cls.is_txr);
    switchCircle1.current.classList.toggle(cls.is_txr);
    switchCircle2.current.classList.toggle(cls.is_txr);

    switchC1.current.classList.toggle(cls.is_hidden);
    switchC2.current.classList.toggle(cls.is_hidden);
    aContainer.current.classList.toggle(cls.is_txl);
    bContainer.current.classList.toggle(cls.is_txl);
    bContainer.current.classList.toggle(cls.is_z200);
  };

  return (
    <div className={clsx(cls.main, darkModeClass)}>
      <div className={cls.mode_toggle}>
        <ModeToggler />
      </div>

      <div
        className={clsx(cls.container, cls.a_container, darkModeClass)}
        id="a-container"
        ref={aContainer}
      >
        <div className={cls.container__inner}>
          <SignUpForm switchForm={switchForm} />
        </div>
      </div>

      <div
        className={clsx(cls.container, cls.b_container, darkModeClass)}
        id="b-container"
        ref={bContainer}
      >
        <div className={cls.container__inner}>
          <SignInForm />
        </div>
      </div>

      <div
        className={clsx(cls.switch, darkModeClass)}
        id="switch-cnt"
        ref={switchCtn}
      >
        <div
          className={clsx(cls.switch__circle, darkModeClass)}
          ref={switchCircle1}
        />

        <div
          className={clsx(
            cls.switch__circle,
            cls.switch__circle__t,
            darkModeClass
          )}
          ref={switchCircle2}
        />

        <div className={cls.switch__container} id="switch-c1" ref={switchC1}>
          {!isMedia800 && (
            <>
              <h2 className={clsx(cls.switch__title, cls.title, darkModeClass)}>
                WellCome!
              </h2>

              <p
                className={clsx(
                  cls.switch__description,
                  cls.description,
                  darkModeClass
                )}
              >
                That to be in touch with us, please, enter your personal details
                and enter to site in your account
              </p>
            </>
          )}

          <button
            onClick={switchForm}
            className={clsx(
              cls.switch__button,
              cls.button,
              cls.switch__btn,
              darkModeClass
            )}
          >
            SIGN IN
          </button>
        </div>

        <div
          className={clsx(cls.switch__container, cls.is_hidden)}
          id="switch-c2"
          ref={switchC2}
        >
          {!isMedia800 && (
            <>
              <h2 className={clsx(cls.switch__title, cls.title, darkModeClass)}>
                Hello friend!
              </h2>

              <p
                className={clsx(
                  cls.switch__description,
                  cls.description,
                  darkModeClass
                )}
              >
                Enter your personal details and start journey with us
              </p>
            </>
          )}

          <button
            onClick={switchForm}
            className={clsx(
              cls.switch__button,
              cls.button,
              cls.switch__btn,
              darkModeClass
            )}
          >
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
});
