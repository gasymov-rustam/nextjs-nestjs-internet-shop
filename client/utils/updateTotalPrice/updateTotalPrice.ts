import { updateCartItemFx } from '../../app/api/shoppingCart';
import { RequestsPath } from '../../constants';
import { updateCartItemTotalPrice } from '../../context/shoppingCart';

export const updateTotalPrice = async (total_price: number, partId: number) => {
  const data = await updateCartItemFx({
    url: `${RequestsPath.SHOPPING_CART_TOTAL_PRICE}/${partId}`,
    payload: { total_price },
  });

  updateCartItemTotalPrice({ partId, total_price: data.total_price });
};
