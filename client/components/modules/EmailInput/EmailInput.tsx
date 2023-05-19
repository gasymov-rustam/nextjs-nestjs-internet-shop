import clsx from 'clsx';

import type { FeedbackFormProps } from '../../../types';

import cls from './EmailInput.module.scss';

export const EmailInput = ({
  errors,
  register,
  darkModeClass,
}: FeedbackFormProps) => {
  return (
    <label className={clsx(cls.feedback_form__form__label, darkModeClass)}>
      <span>Email *</span>

      <input
        className={cls.feedback_form__form__input}
        type="email"
        placeholder="ivan@gmail.com"
        {...register('email', {
          required: {
            value: true,
            message: 'Email is required!',
          },
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Wrong Email!',
          },
        })}
      />

      {errors.email && (
        <span className={cls.error_alert}>{errors.email?.message}</span>
      )}
    </label>
  );
};
