import { AuthInputProps } from '../AuthInputs.type';

import cls from '../AuthInputs.module.scss';

export const NameInput = ({ register, errors }: AuthInputProps) => {
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
            // value: /^[а-яА-Яa-zA-ZёЁ]*$/,
            value: /^[a-zA-Z0-9]*$/,
            message: 'Wrong value!',
          },
        })}
        className={cls.input}
        type="text"
        placeholder="Name"
      />

      {errors.name && <span className={cls.alert}>{errors.name?.message}</span>}
    </label>
  );
};
