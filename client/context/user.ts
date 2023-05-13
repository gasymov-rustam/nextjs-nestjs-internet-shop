import { createDomain } from 'effector-next';
import { IUser } from '../types';

const user = createDomain();

export const setUser = user.createEvent<IUser>();

export const $user = user
  .createStore<IUser | null>(null)
  .on(setUser, (_, user) => user);
