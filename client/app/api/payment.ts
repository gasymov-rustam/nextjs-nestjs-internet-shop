import { createEffect } from 'effector-next';
import { api } from '../axiosClient';

import type { ICheckPayFx, IMakePayFx } from '../../types';

export const makePaymentFx = createEffect(
  async ({ url, amount, description }: IMakePayFx) => {
    const { data } = await api.post(url, { amount, description });

    return data;
  }
);

export const checkPaymentFx = createEffect(
  async ({ url, paymentId }: ICheckPayFx) => {
    const { data } = await api.post(url, { paymentId });

    return data;
  }
);
