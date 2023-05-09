import { memo } from 'react';

import { AuthInputProps } from '../AuthInputs.type';

import cls from '../AuthInputs.module.scss';

export const EmailInput = memo((props: AuthInputProps) => {
  const { register, errors } = props;

  return (
    <label className={cls.form}>
      <input
        {...register('email', {
          required: 'Enter Email!',
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Email is wrong!',
          },
        })}
        className={cls.input}
        type="email"
        placeholder="Email"
      />

      {errors.email && (
        <span className={cls.alert}>{errors.email?.message}</span>
      )}
    </label>
  );
});
