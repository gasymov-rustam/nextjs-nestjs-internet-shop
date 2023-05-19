import clsx from 'clsx';
import { useStore } from 'effector-react';
import { useRouter } from 'next/router';
import { memo, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { checkPaymentFx, makePaymentFx, removeFromCartFx } from '../../../app';
import { RequestsPath } from '../../../constants';
import {
  $shoppingCart,
  $totalPrice,
  setShoppingCart,
} from '../../../context/shoppingCart';
import { $user, $userCity } from '../../../context/user';
import { useTheme } from '../../../hooks';
import { formatPrice } from '../../../utils';
import { Spinner } from '../../elements';

import { OrderAccordion } from '../../modules';
import cls from './OrderPage.module.scss';

export const OrderPage = memo(() => {
  const router = useRouter();
  const [orderIsReady, setOrderIsReady] = useState(false);
  const [agreement, setAgreement] = useState(false);
  const { mode } = useTheme();
  const user = useStore($user);
  const userCity = useStore($userCity);
  const shoppingCart = useStore($shoppingCart);
  const totalPrice = useStore($totalPrice);
  const darkModeClass = { [cls.dark_mode]: mode === 'dark' };
  const spinner = useStore(makePaymentFx.pending);

  const handleAgreementChange = () => setAgreement((prev) => !prev);

  const makePay = async () => {
    try {
      const data = await makePaymentFx({
        url: RequestsPath.PAYMENT,
        amount: totalPrice,
        description: `Order №1 ${
          userCity.city.length
            ? `City: ${userCity.city}, street: ${userCity.street}`
            : ''
        }`,
      });

      sessionStorage.setItem('paymentId', data.id);
      router.push(data.confirmation.confirmation_url);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const checkPayment = async (paymentId: string) => {
    try {
      const data = await checkPaymentFx({
        url: RequestsPath.PAYMENT_INFO,
        paymentId,
      });

      if (data.status === 'succeeded') {
        resetCart();
        return;
      }

      sessionStorage.removeItem('paymentId');
    } catch (error) {
      console.log((error as Error).message);
      sessionStorage.removeItem('paymentId');
    }
  };

  const resetCart = async () => {
    if (user) {
      sessionStorage.removeItem('paymentId');

      await removeFromCartFx(
        `${RequestsPath.SHOPPING_CART_ALL}/${user.userId}`
      );

      setShoppingCart([]);
    }
  };

  useEffect(() => {
    const paymentId = sessionStorage.getItem('paymentId');

    if (paymentId) {
      checkPayment(paymentId);
    }
  }, []);

  return (
    <section className={cls.order}>
      <div className="container">
        <h2 className={clsx(cls.order__title, darkModeClass)}>Ordering</h2>

        <div className={cls.order__inner}>
          <div className={cls.order__cart}>
            <OrderAccordion
              setOrderIsReady={setOrderIsReady}
              showDoneIcon={orderIsReady}
            />
          </div>

          <div className={cls.order__pay}>
            <h3 className={clsx(cls.order__pay__title, darkModeClass)}>
              Total
            </h3>

            <div className={clsx(cls.order__pay__inner, darkModeClass)}>
              <div className={cls.order__pay__goods}>
                <span>
                  Products (
                  {shoppingCart.reduce(
                    (defaultCount, item) => defaultCount + item.count,
                    0
                  )}
                  )
                </span>

                <span>{formatPrice(totalPrice)} P</span>
              </div>

              <div className={cls.order__pay__total}>
                <span>For the amount of</span>

                <span className={clsx(darkModeClass)}>
                  {formatPrice(totalPrice)} P
                </span>
              </div>

              <button
                disabled={!(orderIsReady && agreement)}
                className={cls.order__pay__btn}
                onClick={makePay}
              >
                {spinner ? (
                  <Spinner mode={mode} style={{ top: '6px', left: '47%' }} />
                ) : (
                  'Confirm order'
                )}
              </button>

              <label className={clsx(cls.order__pay__rights, darkModeClass)}>
                <input
                  className={cls.order__pay__rights__input}
                  type="checkbox"
                  onChange={handleAgreementChange}
                  checked={agreement}
                />

                <span className={cls.order__pay__rights__text}>
                  <strong>I agree to the terms and conditions</strong>
                  <p style={{ marginTop: 10 }}>
                    Terms of Use Rules of Use of the Marketplace and Return
                    Policy
                  </p>
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
