import { toast } from 'react-toastify';

import { removeFromCartFx } from '../../app';
import { RequestsPath } from '../../constants';
import { removeShoppingCartItem } from '../../context/shoppingCart';

export const removeItemFromCart = async (
  partId: number,
  setSpinner: (arg: boolean) => void
) => {
  try {
    setSpinner(true);
    await removeFromCartFx(`${RequestsPath.REMOVE_ITEM_FROM_CART}${partId}`);
    removeShoppingCartItem(partId);
  } catch (error) {
    toast.error((error as Error).message);
  } finally {
    setSpinner(false);
  }
};
