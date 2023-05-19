import emailjs from '@emailjs/browser';
import clsx from 'clsx';
import { MutableRefObject, memo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useTheme } from '../../../hooks';
import { Spinner } from '../../elements';
import { MessageInput } from '../MessageInput';
import { NameInput } from '../NameInput';
import { PhoneInput } from '../PhoneInput';

import type { FeedbackInputs } from '../../../types';

import { EmailInput } from '../EmailInput';
import cls from './FeedbackForm.module.scss';

export const FeedbackForm = memo(() => {
  const formRef = useRef() as MutableRefObject<HTMLFormElement>;
  const [spinner, setSpinner] = useState(false);
  const { mode } = useTheme();
  const darkModeClass = mode === 'dark' ? `${cls.dark_mode}` : '';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FeedbackInputs>();

  const submitForm = () => {
    setSpinner(true);
    emailjs
      .sendForm(
        'service_4406d2p',
        'template_88thtrg',
        formRef.current,
        'ARtfb1bp4SELm6yXa'
      )
      .then((result) => {
        setSpinner(false);
        toast.success(`Message sent successfully! ${result.text}`);
      })
      .catch((error) => {
        setSpinner(false);
        toast.error(`Something went wrong! ${error.text}`);
      });

    formRef.current.reset();
  };

  return (
    <div className={clsx(cls.feedback_form, darkModeClass)}>
      <h3 className={clsx(cls.feedback_form__title, darkModeClass)}>
        Feedback form
      </h3>

      <form
        ref={formRef}
        className={cls.feedback_form__form}
        onSubmit={handleSubmit(submitForm)}
      >
        <NameInput
          register={register}
          errors={errors}
          darkModeClass={darkModeClass}
        />

        <PhoneInput
          register={register}
          errors={errors}
          darkModeClass={darkModeClass}
        />

        <EmailInput
          register={register}
          errors={errors}
          darkModeClass={darkModeClass}
        />

        <MessageInput
          register={register}
          errors={errors}
          darkModeClass={darkModeClass}
        />

        <div className={cls.feedback_form__form__btn}>
          <button>
            {spinner ? (
              <Spinner mode={mode} style={{ top: '6px', left: '47%' }} />
            ) : (
              'Send message'
            )}
          </button>
        </div>
      </form>
    </div>
  );
});
