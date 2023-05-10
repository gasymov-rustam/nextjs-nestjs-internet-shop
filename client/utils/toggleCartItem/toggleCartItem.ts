import { toast } from 'react-toastify';
import { removeFromCartFx } from '../../app';
import { RequestsPath } from '../../constants';

export const toggleCartItem = async (
  username: string,
  partId: number,
  isInCart: boolean,
  setSpinner: (arg: boolean) => void
) => {
  try {
    setSpinner(true);

    if (isInCart) {
      await removeFromCartFx(`${RequestsPath.REMOVE_ITEM_FROM_CART}${partId}`);
      // removeShoppingCartItem(partId);
      return;
    }

    // const data = await addToCartFx({
    //   url: RequestsPath.ADD_TO_CAR,
    //   username,
    //   partId,
    // });

    // updateShoppingCart(data);
  } catch (error) {
    toast.error((error as Error).message);
  } finally {
    setSpinner(false);
  }
};
