import { toast } from 'react-toastify';
import { addToCartFx, removeFromCartFx } from '../../app';
import { RequestsPath } from '../../constants';
import {
  removeShoppingCartItem,
  updateShoppingCart,
} from '../../context/shoppingCart';

export const toggleCartItem = async (
  username: string,
  partId: number,
  isInCart: boolean
) => {
  try {
    if (isInCart) {
      await removeFromCartFx(`${RequestsPath.REMOVE_ITEM_FROM_CART}${partId}`);
      removeShoppingCartItem(partId);
      return;
    }

    const data = await addToCartFx({
      url: RequestsPath.ADD_TO_CART,
      username,
      partId,
    });

    updateShoppingCart(data);
  } catch (error) {
    toast.error((error as Error).message);
  } finally {
  }
};
