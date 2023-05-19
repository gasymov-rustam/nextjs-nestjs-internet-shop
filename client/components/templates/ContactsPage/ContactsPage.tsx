import { memo } from 'react';

import { useMediaQuery, useTheme } from '../../../hooks';

import clsx from 'clsx';
import { MailSvg } from '../../elements';
import { FeedbackForm } from '../../modules';
import cls from './ContactsPage.module.scss';

interface ContactsPageProps {
  isWholesaleBuyersPage?: boolean;
}

export const ContactsPage = memo(
  ({ isWholesaleBuyersPage = false }: ContactsPageProps) => {
    const isMobile560 = useMediaQuery(560);
    const { mode } = useTheme();
    const darkModeClass = { [cls.dark_mode]: mode === 'dark' };

    return (
      <section className={cls.contacts}>
        <div className="container">
          <h2 className={clsx(cls.contacts__title, darkModeClass)}>
            {isWholesaleBuyersPage ? 'Wholesale customers' : 'Contacts'}
          </h2>

          <div className={cls.contacts__inner}>
            {isWholesaleBuyersPage ? (
              <div className={clsx(cls.contacts__list, darkModeClass)}>
                <p>
                  <span>
                    The terms of bulk orders are solved individually by phone:
                  </span>

                  <span>+7 (555) 55-55-555</span>
                </p>

                <p>
                  Or describe your order in the feedback form and we will get
                  back to you.
                </p>
              </div>
            ) : (
              <ul className={clsx(cls.contacts__list, darkModeClass)}>
                <li className={cls.contacts__list__title}>
                  <h3 className={clsx(darkModeClass)}>
                    Store parts for gas boilers
                  </h3>
                </li>

                <li className={clsx(cls.contacts__list__item, darkModeClass)}>
                  <span>Office:</span>
                  <span> Tel-Aviv, street Ben-Gurion, ap. 65</span>
                </li>

                <li className={clsx(cls.contacts__list__item, darkModeClass)}>
                  <span>Stock:</span>
                  <span> Tel-Aviv, street Ben-Gurion, ap. 65</span>
                </li>

                <li className={clsx(cls.contacts__list__item, darkModeClass)}>
                  <span>Office schedule:</span>
                  <span> Mo-Su: from 8:00 to 22:00</span>
                </li>

                <li className={clsx(cls.contacts__list__item, darkModeClass)}>
                  <span>Our contact phone number:</span>
                  <span> +972 555-55-55</span>
                </li>

                <li className={clsx(cls.contacts__list__item, darkModeClass)}>
                  <span>Time of acceptance of bids:</span>
                  <span> Mo-Su: from 8:00 to 22:00</span>
                </li>

                <li className={clsx(cls.contacts__list__item, darkModeClass)}>
                  <span>Accept orders electronically on the site:</span>
                  <span> 24/7</span>
                </li>

                <li className={clsx(cls.contacts__list__item, darkModeClass)}>
                  <span>E-mail:</span>

                  <span className={cls.contacts__list__item__mail}>
                    {!isMobile560 && <MailSvg />}{' '}
                    <span>info@zapchasti.com.ru</span>
                  </span>
                </li>
              </ul>
            )}

            <FeedbackForm />
          </div>
        </div>
      </section>
    );
  }
);
