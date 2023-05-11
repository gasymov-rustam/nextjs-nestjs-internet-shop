import { memo, useState } from 'react';
import { useStore } from 'effector-react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';

import { singInFx } from '../../../../app';
import { RequestsPath } from '../../../../constants';
import { showAuthError } from '../../../../utils';
import { NameInput, PasswordInput } from '../../../elements';

import type { IInputs } from '../../../../types';

import cls from '../SignInForm.module.scss';

export const SignInForm = memo(() => {
  const [spinner, setSpinner] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField,
  } = useForm<IInputs>();
  // const mode = useStore($mode);
  const mode = 'dark';
  const darkModeClass = mode === 'dark' ? `${cls.dark_mode}` : '';
  const route = useRouter();

  const onSubmit = async (data: IInputs) => {
    try {
      setSpinner(true);
      await singInFx({
        url: RequestsPath.LOGIN,
        username: data.name,
        password: data.password,
      });

      resetField('name');
      resetField('password');
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
          darkModeClass
        )}
      >
        {spinner ? <div className={cls.spinner} /> : 'SIGN IN'}
      </button>
    </form>
  );
});
