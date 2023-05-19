import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form';

export type FeedbackInputs = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

export type FeedbackFormProps = {
  register: UseFormRegister<FeedbackInputs>;
  errors: Partial<FieldErrorsImpl<FeedbackInputs>>;
  darkModeClass?: string;
};
