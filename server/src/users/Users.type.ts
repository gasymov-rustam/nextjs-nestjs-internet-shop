export type IFilterUser = {
  id?: string;
  username?: string;
  email?: string;
};

export type ErrorMessage = { warningMessage: string };

export type PromiseResponse<T> = Promise<T>;

export type CreateResponse<T> = PromiseResponse<T | ErrorMessage>;
