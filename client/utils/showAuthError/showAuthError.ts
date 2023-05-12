import { AxiosError, isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import { HTTPStatus } from '../../constants';

export const showAuthError = (error: unknown) => {
  const axiosError = error as AxiosError;
  if (isAxiosError(error)) {
    if (
      axiosError.response &&
      axiosError.response.status === HTTPStatus.UNAUTHORIZED
    ) {
      toast.error('You are not authorized to perform this action!');

      return;
    }

    toast.error(error.response?.data?.message || error.message);
  } else {
    toast.error((error as Error).message);
  }
};
