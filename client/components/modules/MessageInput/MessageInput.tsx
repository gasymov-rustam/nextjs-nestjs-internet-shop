import clsx from 'clsx';

import type { FeedbackFormProps } from '../../../types';

import cls from './MessageInput.module.scss';

export const MessageInput = ({
  errors,
  register,
  darkModeClass,
}: FeedbackFormProps) => {
  return (
    <label className={clsx(cls.feedback_form__form__label, darkModeClass)}>
      <textarea
        className={clsx(cls.feedback_form__form__textarea, darkModeClass)}
        placeholder="Enter your message (20 to 300 characters)"
        {...register('message', {
          required: 'Enter your message!',
          minLength: 20,
          maxLength: 300,
        })}
      />

      {errors.message && (
        <span className={cls.error_alert}>{errors.message?.message}</span>
      )}

      {errors.message && errors.message.type === 'minLength' && (
        <span className={cls.error_alert}>Minimum 20 characters!</span>
      )}

      {errors.message && errors.message.type === 'maxLength' && (
        <span className={cls.error_alert}>Not more than 300 characters!</span>
      )}
    </label>
  );
};
