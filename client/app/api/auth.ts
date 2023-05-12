import { AxiosError } from 'axios';
import { createEffect } from 'effector-next';
import { toast } from 'react-toastify';

import { HTTPStatus } from '../../constants';
import { api } from '../axiosClient';

import type { ISignInFx, ISignUpFx } from '../types';

export const singUpFx = createEffect(
  async ({ url, username, password, email }: ISignUpFx) => {
    const { data } = await api.post(url, { username, password, email });

    if (data.warningMessage) {
      toast.warning(data.warningMessage);
      return;
    }

    toast.success('Registered successfully!');

    return data;
  }
);

export const singInFx = createEffect(
  async ({ url, username, password }: ISignInFx) => {
    const { data } = await api.post(url, { username, password });

    toast.success('Signed in successfully!');
    return data;
  }
);

export const checkUserAuthFx = createEffect(async (url: string) => {
  try {
    const { data } = await api.get(url);

    return data;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      if (axiosError.response.status === HTTPStatus.FORBIDDEN) {
        return false;
      }
    }

    toast.error((error as Error).message);
  }
});

export const logoutFx = createEffect(async (url: string) => {
  try {
    await api.get(url);
  } catch (error) {
    toast.error((error as Error).message);
  }
});
