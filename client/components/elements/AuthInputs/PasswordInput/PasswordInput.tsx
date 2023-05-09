import { memo } from 'react';

import { AuthInputProps } from '../AuthInputs.type';

import cls from '../AuthInputs.module.scss';

export const PasswordInput = memo(({ register, errors }: AuthInputProps) => (
  <label className={cls.form}>
    <input
      {...register('password', {
        required: 'Password!',
        minLength: 4,
        maxLength: 20,
      })}
      className={cls.input}
      type="password"
      placeholder="Password"
    />
    {errors.password && (
      <span className={cls.alert}>{errors.password?.message}</span>
    )}
    {errors.password && errors.password.type === 'minLength' && (
      <span className={cls.alert}>Should be more then 4 symbols!</span>
    )}
    {errors.password && errors.password.type === 'maxLength' && (
      <span className={cls.alert}>Should be less then 20 symbols!</span>
    )}
  </label>
));
