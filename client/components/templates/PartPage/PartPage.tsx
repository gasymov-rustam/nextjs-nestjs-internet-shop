import { useStore } from 'effector-react';
import { memo, useEffect } from 'react';
import { toast } from 'react-toastify';

import { getBoilerPartsFx, removeFromCartFx } from '../../../app';
import { $boilerPart } from '../../../context/boilerPart';
import {
  $boilerParts,
  setBoilerParts,
  setBoilerPartsByPopularity,
} from '../../../context/boilerParts';
import { $shoppingCart } from '../../../context/shoppingCart';
import { $user } from '../../../context/user';
import { useMediaQuery, useTheme } from '../../../hooks';
import { formatPrice, toggleCartItem } from '../../../utils';

import clsx from 'clsx';
import { CartHoverCheckedSvg, CartHoverSvg, Spinner } from '../../elements';
import {
  DashBoardSlider,
  PartAccordion,
  PartImagesList,
  PartTabs,
} from '../../modules';
import cls from './PartPage.module.scss';

export const PartPage = memo(() => {
  const { mode } = useTheme();
  const user = useStore($user);

  const boilerPart = useStore($boilerPart);
  const cartItems = useStore($shoppingCart);
  const boilerParts = useStore($boilerParts);
  const isMobile = useMediaQuery(850);

  const darkModeClass = { [cls.dark_mode]: mode === 'dark' };
  const isInCart = cartItems.some((item) => item.partId === boilerPart.id);

  const spinnerToggleCart = useStore(removeFromCartFx.pending);
  const spinnerSlider = useStore(getBoilerPartsFx.pending);

  useEffect(() => {
    loadBoilerPart();
  }, []);

  const loadBoilerPart = async () => {
    try {
      const data = await getBoilerPartsFx('/boiler-parts?limit=20&offset=0');

      setBoilerParts(data);
      setBoilerPartsByPopularity();
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const toggleToCart = () => {
    if (user) {
      toggleCartItem(user.username, boilerPart.id, isInCart);
    }
  };

  return (
    <section>
      <div className="container">
        <div className={clsx(cls.part__top, darkModeClass)}>
          <h2 className={clsx(cls.part__title, darkModeClass)}>
            {boilerPart.name}
          </h2>

          <div className={cls.part__inner}>
            <PartImagesList />

            <div className={cls.part__info}>
              <span className={clsx(cls.part__info__price, darkModeClass)}>
                {formatPrice(boilerPart.price || 0)} P
              </span>

              <span className={cls.part__info__stock}>
                {boilerPart.in_stock > 0 ? (
                  <span className={cls.part__info__stock__success}>
                    In stock
                  </span>
                ) : (
                  <span className={cls.part__info__stock__not}>
                    Not in stock
                  </span>
                )}
              </span>

              <span className={cls.part__info__code}>
                Item: {boilerPart.vendor_code}
              </span>

              <button
                className={clsx(cls.part__info__btn, {
                  [cls.in_cart]: isInCart,
                })}
                onClick={toggleToCart}
              >
                {spinnerToggleCart ? (
                  <Spinner mode={mode} style={{ top: 10, left: '45%' }} />
                ) : (
                  <>
                    <span className={cls.part__info__btn__icon}>
                      {isInCart ? <CartHoverCheckedSvg /> : <CartHoverSvg />}
                    </span>
                    {isInCart ? (
                      <span>Added to cart</span>
                    ) : (
                      <span>Add to cart</span>
                    )}
                  </>
                )}
              </button>

              {!isMobile && <PartTabs />}
            </div>
          </div>
        </div>

        {isMobile && (
          <div className={cls.part__accordion}>
            <div className={cls.part__accordion__inner}>
              <PartAccordion title="Description">
                <div
                  className={clsx(cls.part__accordion__content, darkModeClass)}
                >
                  <h3
                    className={clsx(
                      cls.part__tabs__content__title,
                      darkModeClass
                    )}
                  >
                    {boilerPart.name}
                  </h3>

                  <p
                    className={clsx(
                      cls.part__tabs__content__text,
                      darkModeClass
                    )}
                  >
                    {boilerPart.description}
                  </p>
                </div>
              </PartAccordion>
            </div>

            <PartAccordion title="Compatibility">
              <div
                className={clsx(cls.part__accordion__content, darkModeClass)}
              >
                <p
                  className={clsx(cls.part__tabs__content__text, darkModeClass)}
                >
                  {boilerPart.compatibility}
                </p>
              </div>
            </PartAccordion>
          </div>
        )}
        <div className={cls.part__bottom}>
          <h2 className={clsx(cls.part__title, darkModeClass)}>
            You may also like
          </h2>

          <DashBoardSlider
            goToPartPage
            spinner={spinnerSlider}
            items={boilerParts.rows || []}
          />
        </div>
      </div>
    </section>
  );
});
