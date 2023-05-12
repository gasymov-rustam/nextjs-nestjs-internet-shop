import { AuthInputProps } from '../AuthInputs.type';

import cls from '../AuthInputs.module.scss';

export const EmailInput = (props: AuthInputProps) => {
  const { register, errors } = props;
  console.log('🚀 => 👍 ==>> EmailInput ==>> Line #7 ==>> ', errors.email);
  return (
    <label className={cls.form}>
      <input
        {...register('email', {
          required: 'Enter Email!',
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Email is wrong!',
          },
        })}
        className={cls.input}
        type="email"
        placeholder="Email"
      />

      {errors.email && (
        <span className={cls.alert}>{errors.email?.message}</span>
      )}
    </label>
  );
};
