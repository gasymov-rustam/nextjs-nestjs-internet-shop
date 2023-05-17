import { useStore } from 'effector-react';
import { useEffect, useState } from 'react';
import { removeFromCartFx } from '../../app';
import { removeItemFromCart, updateTotalPrice } from '../../utils';

export const usePrice = (
  count: number,
  partId: number,
  initialPrice: number
) => {
  const spinner = useStore(removeFromCartFx.pending);
  const [price, setPrice] = useState(initialPrice);

  useEffect(() => {
    setPrice(price * count);
  }, []);

  useEffect(() => {
    updateTotalPrice(price, partId);
  }, [price]);

  const increasePrice = () => setPrice(price + initialPrice);
  const decreasePrice = () => setPrice(price - initialPrice);
  const deleteCartItem = () => removeItemFromCart(partId);

  return { price, spinner, increasePrice, decreasePrice, deleteCartItem };
};
