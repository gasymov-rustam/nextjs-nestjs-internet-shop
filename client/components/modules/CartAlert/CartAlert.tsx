import clsx from 'clsx';
import Link from 'next/link';
import { memo } from 'react';

import { useStore } from 'effector-react';
import { Paths } from '../../../constants';
import { $totalPrice } from '../../../context/shoppingCart';
import { useTheme } from '../../../hooks';
import { formatPrice } from '../../../utils';

import cls from './CartAlert.module.scss';

interface CartAlertProps {
  count: number;
  closeAlert: VoidFunction;
}

export const CartAlert = memo(({ count, closeAlert }: CartAlertProps) => {
  const { mode } = useTheme();
  const darkModeClass = { [cls.dark_mode]: mode === 'dark' };
  const totalPrice = useStore($totalPrice);

  const showCountMessage = (count: string) => {
    if (count.endsWith('1')) {
      return 'good';
    }

    return 'goods';
  };

  return (
    <>
      <div className={clsx(cls.dashboard__alert__left, darkModeClass)}>
        <span>
          In cart {count} {showCountMessage(`${count}`)}
        </span>
        <span>Sum: {formatPrice(totalPrice)} $</span>
      </div>

      <div className={cls.dashboard__alert__right}>
        <Link href={Paths.ORDER} legacyBehavior passHref>
          <a className={cls.dashboard__alert__btn_cart}>To cart</a>
        </Link>

        <Link href={Paths.ORDER} legacyBehavior passHref>
          <a className={cls.dashboard__alert__btn_order}>Place an order</a>
        </Link>
      </div>

      <button
        className={cls.dashboard__alert__btn_close}
        onClick={closeAlert}
      />
    </>
  );
});
