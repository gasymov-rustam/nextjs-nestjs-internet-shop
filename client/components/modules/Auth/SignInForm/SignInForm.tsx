import clsx from 'clsx';
import { useRouter } from 'next/router';
import { memo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { singInFx } from '../../../../app';
import { RequestsPath } from '../../../../constants';
import { useTheme } from '../../../../hooks';
import { showAuthError } from '../../../../utils';
import { NameInput, PasswordInput } from '../../../elements';

import type { IInputs } from '../../../../types';

import cls from '../SignInForm.module.scss';

export const SignInForm = memo(() => {
  const [spinner, setSpinner] = useState(false);
  const {
    register,
    formState: { errors, isValid, isDirty },
    handleSubmit,
    reset,
  } = useForm<IInputs>({
    mode: 'onBlur',
  });
  const { mode } = useTheme();
  const darkModeClass = mode === 'dark' ? cls.dark_mode : '';
  const route = useRouter();

  const onSubmit = async (data: IInputs) => {
    try {
      setSpinner(true);
      await singInFx({
        url: RequestsPath.LOGIN,
        username: data.name,
        password: data.password,
      });

      reset();
      route.push('/dashboard');
    } catch (error) {
      showAuthError(error);
    } finally {
      setSpinner(false);
    }
  };

  return (
    <form
      className={clsx(cls.form, darkModeClass)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className={clsx(cls.form__title, cls.title, darkModeClass)}>
        Enter to site
      </h2>

      <NameInput register={register} errors={errors} />

      <PasswordInput register={register} errors={errors} />

      <button
        className={clsx(
          cls.form__button,
          cls.button,
          cls.submit,
          darkModeClass,
          { disabled: !isValid || !isDirty }
        )}
        disabled={!isValid || !isDirty}
      >
        {spinner ? <div className={cls.spinner} /> : 'SIGN IN'}
      </button>
    </form>
  );
});
