import clsx from 'clsx';
import { memo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { singUpFx } from '../../../../app';
import { RequestsPath } from '../../../../constants';
import { useTheme } from '../../../../hooks';
import { showAuthError } from '../../../../utils';
import {
  EmailInput,
  NameInput,
  PasswordInput,
  Spinner,
} from '../../../elements';

import type { IInputs } from '../../../../types';

import cls from '../SignInForm.module.scss';

interface SignUpFormProps {
  switchForm: () => void;
}

export const SignUpForm = memo(({ switchForm }: SignUpFormProps) => {
  const [spinner, setSpinner] = useState(false);
  const {
    register,
    formState: { errors, isDirty, isValid },
    handleSubmit,
    reset,
  } = useForm<IInputs>({
    mode: 'onBlur',
  });
  const { mode } = useTheme();
  const darkModeClass = { [cls.dark_mode]: mode === 'dark' };

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
          darkModeClass,
          { disabled: !isValid || !isDirty }
        )}
        disabled={!isValid || !isDirty}
      >
        {spinner ? <Spinner mode={mode} /> : 'SIGN UP'}
      </button>
    </form>
  );
});
