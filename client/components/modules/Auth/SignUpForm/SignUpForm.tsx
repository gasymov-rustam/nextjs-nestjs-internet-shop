import { memo, useState } from 'react';
import { useStore } from 'effector-react';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';

import { EmailInput, NameInput, PasswordInput } from '../../../elements';
import { RequestsPath } from '../../../../constants';
import { showAuthError } from '../../../../utils';
import { singUpFx } from '../../../../app';

import type { IInputs } from '../../../../types';

import cls from '../SignInForm.module.scss';

interface SignUpFormProps {
  switchForm: () => void;
}

export const SignUpForm = memo(({ switchForm }: SignUpFormProps) => {
  const [spinner, setSpinner] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField,
    reset,
  } = useForm<IInputs>();
  // const mode = useStore($mode);
  const mode = 'dark';
  const darkModeClass = mode === 'dark' ? `${cls.dark_mode}` : '';

  const onSubmit = async (data: IInputs) => {
    try {
      setSpinner(true);
      const userData = await singUpFx({
        url: RequestsPath.REGISTER,
        username: data.name,
        password: data.password,
        email: data.email,
      });

      if (!userData) {
        return;
      }

      // resetField('email');
      // resetField('name');
      // resetField('password');
      reset();
      switchForm();
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
        Create new account
      </h2>

      <NameInput register={register} errors={errors} />

      <EmailInput register={register} errors={errors} />

      <PasswordInput register={register} errors={errors} />

      <button
        className={clsx(
          cls.form__button,
          cls.button,
          cls.submit,
          darkModeClass
        )}
      >
        {spinner ? <div className={cls.spinner} /> : 'SIGN UP'}
      </button>
    </form>
  );
});
