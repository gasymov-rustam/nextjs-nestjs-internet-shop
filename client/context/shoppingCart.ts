import { createDomain } from 'effector-next';
import { IShoppingCartItem } from '../types';

const shoppingCart = createDomain();

export const setShoppingCart = shoppingCart.createEvent<IShoppingCartItem[]>();
export const updateShoppingCart = shoppingCart.createEvent<IShoppingCartItem>();
export const removeShoppingCartItem = shoppingCart.createEvent<number>();

const remove = (cartItems: IShoppingCartItem[], partId: number) =>
  cartItems.filter((item) => item.partId !== partId);

export const $shoppingCart = shoppingCart
  .createStore<IShoppingCartItem[]>([])
  .on(setShoppingCart, (_, shoppingCart) => shoppingCart)
  .on(updateShoppingCart, (state, cartItem) => [...state, cartItem])
  .on(removeShoppingCartItem, (state, partId) => [...remove(state, partId)]);
