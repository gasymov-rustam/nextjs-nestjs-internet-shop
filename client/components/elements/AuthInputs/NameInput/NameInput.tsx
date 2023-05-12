import { memo } from 'react';

import { AuthInputProps } from '../AuthInputs.type';

import cls from '../AuthInputs.module.scss';

export const NameInput = memo(({ register, errors }: AuthInputProps) => {
  return (
    <label className={cls.form}>
      <input
        {...register('name', {
          required: 'Enter your name!',
          minLength: {
            value: 2,
            message: 'Should be more then 2 symbols!',
          },
          maxLength: {
            value: 15,
            message: 'Should be less then 15 symbols!',
          },
          pattern: {
            value: /^[а-яА-Яa-zA-ZёЁ]*$/,
            message: 'Wrong value!',
          },
        })}
        className={cls.input}
        type="text"
        placeholder="Name"
      />

      {errors.name && <span className={cls.alert}>{errors.name?.message}</span>}
      {/*
    {errors.name && errors.name.type === 'minLength' && (
      <span className={cls.alert}>Should be more then 2 symbols!</span>
    )}

    {errors.name && errors.name.type === 'maxLength' && (
      <span className={cls.alert}>Should be less then 15 symbols!</span>
    )} */}
    </label>
  );
});
