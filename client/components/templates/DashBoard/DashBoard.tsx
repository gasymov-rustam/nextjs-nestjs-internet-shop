import clsx from 'clsx';
import { useStore } from 'effector-react';
import { AnimatePresence, motion } from 'framer-motion';
import { memo, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { getBestsellersOrNewPartsFx } from '../../../app';
import { RequestsPath } from '../../../constants';
import { $shoppingCart } from '../../../context/shoppingCart';
import { useTheme } from '../../../hooks';
import { BrandSlider, CartAlert, DashBoardSlider } from '../../modules';

import type { IBoilerParts } from '../../../types';

import cls from './DashBoard.module.scss';

const initialState: IBoilerParts = {
  count: 0,
  rows: [],
};

export const DashBoard = memo(() => {
  const shoppingCart = useStore($shoppingCart);
  const [spinner, setSpinner] = useState(false);
  const [newParts, setNewParts] = useState<IBoilerParts>(initialState);
  const [bestsellers, setBestsellers] = useState<IBoilerParts>(initialState);
  const [showAlert, setShowAlert] = useState(!!shoppingCart.length);
  const { mode } = useTheme();

  const darkModeClass = { [cls.dark_mode]: mode === 'dark' };

  const closeAlert = () => setShowAlert(false);

  const loadBoilerParts = useCallback(async () => {
    try {
      setSpinner(true);
      const bestsellers = await getBestsellersOrNewPartsFx(
        RequestsPath.BOILER_PARTS_BESTSELLERS
      );
      const newParts = await getBestsellersOrNewPartsFx(
        RequestsPath.BOILER_PARTS_NEW
      );

      setBestsellers(bestsellers);
      setNewParts(newParts);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setSpinner(false);
    }
  }, []);

  useEffect(() => {
    loadBoilerParts();
  }, []);

  return (
    <section className={cls.dashboard}>
      <div className={clsx('container', cls.dashboard__container)}>
        <AnimatePresence>
          {showAlert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={clsx(cls.dashboard__alert, darkModeClass)}
            >
              <CartAlert count={shoppingCart.length} closeAlert={closeAlert} />
            </motion.div>
          )}
        </AnimatePresence>

        <div className={cls.dashboard__brands}>
          <BrandSlider />
        </div>

        <h2 className={clsx(cls.dashboard__title, darkModeClass)}>
          Boiler Parts
        </h2>
        <div className={cls.dashboard__parts}>
          <h3 className={clsx(cls.dashboard__parts__title, darkModeClass)}>
            Bestsellers
          </h3>

          <DashBoardSlider items={bestsellers.rows || []} spinner={spinner} />
        </div>

        <div className={cls.dashboard__parts}>
          <h3 className={clsx(cls.dashboard__parts__title, darkModeClass)}>
            News
          </h3>

          <DashBoardSlider items={newParts.rows || []} spinner={spinner} />
        </div>

        <div className={cls.dashboard__about}>
          <h3
            className={clsx(
              cls.dashboard__parts__title,
              cls.dashboard__about__title,
              darkModeClass
            )}
          >
            About Company
          </h3>

          <p className={clsx(cls.dashboard__about__text, darkModeClass)}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit
            impedit quisquam, debitis accusantium sit itaque vel commodi
            incidunt, expedita ex, ipsam odio vitae quidem voluptates blanditiis
            doloremque natus labore veritatis. Cupiditate eaque ipsam amet
            consectetur aperiam distinctio sequi sint laborum iste libero?
          </p>
        </div>
      </div>
    </section>
  );
});
