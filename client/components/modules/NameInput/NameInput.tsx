import clsx from 'clsx';
import { memo } from 'react';

import type { FeedbackFormProps } from '../../../types';

import cls from './NameInput.module.scss';

export const NameInput = memo(
  ({ errors, register, darkModeClass }: FeedbackFormProps) => {
    return (
      <label className={clsx(cls.feedback_form__form__label, darkModeClass)}>
        <span>Name *</span>

        <input
          className={cls.feedback_form__form__input}
          type="text"
          placeholder="Alex"
          {...register('name', {
            required: 'Enter your Name!',
            pattern: {
              value: /^[a-zA-Z]*$/,
              message: 'Only letters!',
            },
            minLength: 2,
            maxLength: 15,
          })}
        />

        {errors.name && (
          <span className={cls.error_alert}>{errors.name?.message}</span>
        )}

        {errors.name && errors.name.type === 'minLength' && (
          <span className={cls.error_alert}>Minimum 2 characters!</span>
        )}

        {errors.name && errors.name.type === 'maxLength' && (
          <span className={cls.error_alert}>Maximum 15 characters!</span>
        )}
      </label>
    );
  }
);
