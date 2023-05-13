import clsx from 'clsx';
import Link from 'next/link';
import { memo } from 'react';

import { Paths } from '../../../constants';
import { useTheme } from '../../../hooks';
import { formatPrice } from '../../../utils';

import cls from './CartAlert.module.scss';

interface CartAlertProps {
  count: number;
  closeAlert: VoidFunction;
}

export const CartAlert = memo(({ count, closeAlert }: CartAlertProps) => {
  const { mode } = useTheme();
  const darkModeClass = mode === 'dark' ? cls.dark_mode : '';

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
        <span>Sum: {formatPrice(0)} P</span>
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
