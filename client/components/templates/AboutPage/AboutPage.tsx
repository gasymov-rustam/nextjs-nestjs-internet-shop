import clsx from 'clsx';
import { memo } from 'react';

import { useTheme } from '../../../hooks';

import cls from './AboutPage.module.scss';

export const AboutPage = memo(() => {
  const { mode } = useTheme();
  const darkModeClass = { [cls.dark_mode]: mode === 'dark' };

  return (
    <section className={cls.about}>
      <div className="container">
        <h2 className={clsx(cls.about__title, darkModeClass)}>About company</h2>

        <div className={cls.about__inner}>
          <div className={clsx(cls.about__info, darkModeClass)}>
            <p>
              Company &quot;AquaTermiks&quot; offers you spare parts for
              European, Korean and domestic gas and electric boilers. 99% of the
              parts listed on the site are constantly in stock at our warehouse.
            </p>
            <p>
              The assortment of the online store &quot;AquaTermiks&quot;
              includes spare parts for Arderia, Ariston, Baxi boilers, Beretta,
              Bosch, Buderus, Chaffoteaux, De Dietrich, Demrad, Electrolux,
              Ferroli, Fondital, Immergas, Junkers, Koreastar, Nova Florida,
              Saunier Duval, Sime, Tiberis, Vaillant, Viessmann, West.
            </p>
          </div>

          <div className={clsx(cls.about__img, cls.about__img__top)}>
            <img src="/img/about-img.png" alt="image-1" />
          </div>

          <div className={clsx(cls.about__img, cls.about__img__bottom)}>
            <img src="/img/about-img-2.png" alt="image-2" />
          </div>
        </div>
      </div>
    </section>
  );
});
