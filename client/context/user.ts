import { createDomain } from 'effector-next';
import { IUser } from '../types';

const user = createDomain();

export const setUser = user.createEvent<IUser>();
export const setUserCity = user.createEvent<{ city: string; street: string }>();

export const $user = user
  .createStore<IUser | null>(null)
  .on(setUser, (_, user) => user);

export const $userCity = user
  .createStore({ city: '', street: '' })
  .on(setUserCity, (_, city) => city);
