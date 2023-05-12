import { memo } from 'react';

import { AuthInputProps } from '../AuthInputs.type';

import cls from '../AuthInputs.module.scss';

export const PasswordInput = memo(({ register, errors }: AuthInputProps) => (
  <label className={cls.form}>
    <input
      {...register('password', {
        required: 'Password!',
        minLength: {
          value: 4,
          message: 'Should be more then 4 symbols!',
        },
        maxLength: {
          value: 20,
          message: 'Should be less then 20 symbols!',
        },
      })}
      className={cls.input}
      type="password"
      placeholder="Password"
    />
    {errors.password && (
      <span className={cls.alert}>{errors.password?.message}</span>
    )}
  </label>
));
