import clsx from 'clsx';
import { memo, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { updateCartItemFx } from '../../../app/api/shoppingCart';
import { updateCartItemCount } from '../../../context/shoppingCart';
import { useTheme } from '../../../hooks';
import { MinusSvg } from '../MinusSvg';
import { PlusSvg } from '../PlusSvg';
import { Spinner } from '../Spinner';

import { RequestsPath } from '../../../constants';
import cls from './CartItemCounter.module.scss';

interface CartItemCounterProps {
  totalCount: number;
  partId: number;
  initialCount: number;
  increasePrice: VoidFunction;
  decreasePrice: VoidFunction;
}

export const CartItemCounter = memo((props: CartItemCounterProps) => {
  const { partId, initialCount, totalCount, decreasePrice, increasePrice } =
    props;
  const { mode } = useTheme();
  const darkModeClass = { [cls.dark_mode]: mode === 'dark' };
  const [spinner, setPinner] = useState(false);
  const [count, setCount] = useState(initialCount);
  const [disableIncrease, setDisableIncrease] = useState(false);
  const [disableDecrease, setDisableDecrease] = useState(false);

  useEffect(() => {
    if (count === 1) {
      setDisableDecrease(true);
    }

    if (count === totalCount) {
      setDisableIncrease(true);
    }
  }, [count, totalCount]);

  const increase = async () => {
    try {
      setPinner(true);
      increasePrice();
      setDisableDecrease(false);
      setCount(count + 1);

      const data = await updateCartItemFx({
        url: `${RequestsPath.SHOPPING_CART_COUNT}/${partId}`,
        payload: { count: count + 1 },
      });

      updateCartItemCount({ partId, count: data.count });
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setPinner(false);
    }
  };

  const decrease = async () => {
    try {
      setPinner(true);
      decreasePrice();
      setDisableIncrease(false);
      setCount(count - 1);

      const data = await updateCartItemFx({
        url: `${RequestsPath.SHOPPING_CART_COUNT}/${partId}`,
        payload: { count: count - 1 },
      });

      updateCartItemCount({ partId, count: data.count });
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setPinner(false);
    }
  };

  return (
    <div className={clsx(cls.counter, darkModeClass)}>
      <button disabled={disableDecrease} onClick={decrease}>
        <MinusSvg />
      </button>
      <span>
        {spinner ? (
          <Spinner
            mode={mode}
            style={{ top: 4, left: 33, width: 20, height: 20 }}
          />
        ) : (
          count
        )}
      </span>
      <button disabled={disableIncrease} onClick={increase}>
        <PlusSvg />
      </button>
    </div>
  );
});
