import clsx from 'clsx';

import type { FeedbackFormProps } from '../../../types';

import cls from './PhoneInput.module.scss';

export const PhoneInput = ({
  errors,
  register,
  darkModeClass,
}: FeedbackFormProps) => {
  return (
    <label className={clsx(cls.feedback_form__form__label, darkModeClass)}>
      <span>Telephone *</span>

      <input
        className={cls.feedback_form__form__input}
        placeholder="+972 999 99 99"
        type="tel"
        {...register('phone', {
          required: 'Enter your telephone!',
          pattern: {
            value: /^\d*[1-9]\d*$/,
            message: 'Only numbers!',
          },
          minLength: 11,
          maxLength: 11,
        })}
      />

      {errors.phone && (
        <span className={cls.error_alert}>{errors.phone?.message}</span>
      )}

      {errors.phone && errors.phone.type === 'minLength' && (
        <span className={cls.error_alert}>
          Minimum 11 digits (without +972)!
        </span>
      )}

      {errors.phone && errors.phone.type === 'maxLength' && (
        <span className={cls.error_alert}>
          Not more than 11 digits (without +972)!
        </span>
      )}
    </label>
  );
};
