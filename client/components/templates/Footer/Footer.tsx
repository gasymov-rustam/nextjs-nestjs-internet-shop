import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';

import { Paths } from '../../../constants';
import { useMediaQuery } from '../../../hooks';
import { Accordion, MailSvg, MarkerSvg, PhoneSvg } from '../../elements';
import { CompanyContent, FooterLogo, OnlineStoreContent } from '../../modules';

import cls from './Footer.module.scss';

export const Footer = memo(() => {
  const isMedia750 = useMediaQuery(750);
  const isMedia500 = useMediaQuery(500);

  return (
    <footer className={cls.footer}>
      <div className={cls.footer__container}>
        <div className={cls.footer__top}>
          {!isMedia750 && <FooterLogo />}

          <div className={cls.footer__top__inner}>
            <div className={cls.footer__top__item}>
              {!isMedia500 && (
                <>
                  <h3 className={cls.footer__top__item__title}>
                    Internet-shop
                  </h3>
                  <OnlineStoreContent />
                </>
              )}

              {isMedia500 && (
                <Accordion
                  title="Internet-shop"
                  titleClass={cls.footer__top__item__title}
                  arrowOpenClass={cls.open}
                >
                  <OnlineStoreContent />
                  <div style={{ height: 17 }} />
                </Accordion>
              )}
            </div>

            <div className={cls.footer__top__item}>
              {!isMedia500 && (
                <>
                  <h3 className={cls.footer__top__item__title}>Company</h3>
                  <CompanyContent />
                </>
              )}

              {isMedia500 && (
                <Accordion
                  title="Company"
                  titleClass={cls.footer__top__item__title}
                  arrowOpenClass={cls.open}
                >
                  <CompanyContent />
                  <div style={{ height: 17 }} />
                </Accordion>
              )}
            </div>
          </div>
          <div className={cls.footer__top__item}>
            <h3 className={cls.footer__top__item__title}>Contacts</h3>

            <ul
              className={`${cls.footer__top__item__list} ${cls.footer__top__item__contacts}`}
            >
              <li className={cls.footer__top__item__list__item}>
                <Link href={Paths.CONTACTS} passHref legacyBehavior>
                  <a className={cls.footer__top__item__list__item__link}>
                    <span>Our address:</span>
                    <span>Israel, Tel-Aviv</span>

                    <span>
                      <MarkerSvg />
                    </span>
                  </a>
                </Link>
              </li>
              <li className={cls.footer__top__item__list__item}>
                <a
                  href="tel:+97255555555"
                  className={cls.footer__top__item__list__item__link}
                >
                  <span>Telekom:</span>
                  <span>+9(72) 555-55-55</span>

                  <span>
                    <PhoneSvg />
                  </span>
                </a>
              </li>
              <li className={cls.footer__top__item__list__item}>
                <a
                  href="mailto:info@zapchasti.com.ru"
                  className={cls.footer__top__item__list__item__link}
                >
                  <span>E-mail:</span>
                  <span>info@zapchasti.co.il</span>

                  <span>
                    <MailSvg />
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={cls.footer__bottom}>
          <div className={cls.footer__bottom__block}>
            <div className={cls.footer__bottom__block__left}>
              <h3 className={cls.footer__bottom__block__title}>
                Can pay using:
              </h3>

              <ul className={cls.footer__bottom__block__pay}>
                <li className={cls.footer__bottom__block__pay__item}>
                  <Image
                    src="/img/pay.png"
                    alt="apple-pay"
                    width={30}
                    height={30}
                  />
                </li>

                <li className={cls.footer__bottom__block__pay__item}>
                  <Image
                    src="/img/gpay.png"
                    alt="google-pay"
                    width={30}
                    height={30}
                  />
                </li>

                <li className={cls.footer__bottom__block__pay__item}>
                  <Image
                    src="/img/master-card.png"
                    alt="master-card"
                    width={30}
                    height={30}
                  />
                </li>

                <li className={cls.footer__bottom__block__pay__item}>
                  <Image
                    src="/img/visa.png"
                    alt="visa"
                    width={30}
                    height={30}
                  />
                </li>
              </ul>
            </div>
            <div className={cls.footer__bottom__block__right}>
              <h3 className={cls.footer__bottom__block__title}>
                We are online:
              </h3>

              <ul className={cls.footer__bottom__block__social}>
                <li className={cls.footer__bottom__block__social__item}>
                  <a
                    href="#"
                    className={cls.footer__bottom__block__social__item_vk}
                  />
                </li>

                <li className={cls.footer__bottom__block__social__item}>
                  <a
                    href="#"
                    className={cls.footer__bottom__block__social__item_fb}
                  />
                </li>

                <li className={cls.footer__bottom__block__social__item}>
                  <a
                    href="#"
                    className={cls.footer__bottom__block__social__item_inst}
                  />
                </li>

                <li className={cls.footer__bottom__block__social__item}>
                  <a
                    href="#"
                    className={cls.footer__bottom__block__social__item_ytb}
                  />
                </li>
              </ul>
            </div>
          </div>
          {isMedia750 && <FooterLogo />}

          <div className={cls.footer__bottom__block}>
            <p className={cls.footer__bottom__block__copyright}>
              © «Details for gas boilers» 2023.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
});
