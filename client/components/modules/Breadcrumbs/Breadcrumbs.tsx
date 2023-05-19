/* eslint-disable max-len */
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { Paths } from '../../../constants';
import { useTheme } from '../../../hooks';
import { CrumbArrowSvg } from '../../elements';

import cls from './Breadcrumbs.module.scss';

const generatePathParts = (pathStr: string) => {
  const pathWithoutQuery = pathStr.split('?')[0];
  return pathWithoutQuery.split('/').filter((v) => v.length > 0);
};

interface BreadcrumbsProps {
  getTextGenerator: (arg0: string, query: ParsedUrlQuery) => void;
  getDefaultTextGenerator: (arg0: string, href: string) => string;
}

interface CrumbProps {
  text: string;
  href: string;
  last: boolean;
  textGenerator: () => string;
}

const Crumb = memo(
  ({ text: defaultText, textGenerator, href, last = false }: CrumbProps) => {
    const [text, setText] = useState(defaultText);
    const { mode } = useTheme();
    const darkModeClass = { [cls.dark_mode]: mode === 'dark' };

    const handleTextGenerate = useCallback(async () => {
      if (!Boolean(textGenerator)) {
        return;
      }

      const finalText = await textGenerator();
      setText(finalText);
    }, [textGenerator]);

    useEffect(() => {
      handleTextGenerate();
    }, [handleTextGenerate, textGenerator]);

    if (last) {
      return (
        <a>
          <span
            className={clsx(cls.breadcrumbs__item__icon, darkModeClass)}
            style={{ marginRight: 13 }}
          >
            <CrumbArrowSvg />
          </span>

          <span className={clsx('last-crumb', cls.breadcrumbs__item__text)}>
            {text}
          </span>
        </a>
      );
    }

    return (
      <Link href={href} passHref legacyBehavior>
        <a>
          <span
            className={clsx(cls.breadcrumbs__item__icon, darkModeClass)}
            style={{ marginRight: 13 }}
          >
            <CrumbArrowSvg />
          </span>

          <span className={cls.breadcrumbs__item__text}>{text}</span>
        </a>
      </Link>
    );
  }
);

export const Breadcrumbs = memo(
  ({ getTextGenerator, getDefaultTextGenerator }: BreadcrumbsProps) => {
    const router = useRouter();
    const { mode } = useTheme();
    const darkModeClass = { [cls.dark_mode]: mode === 'dark' };

    const breadcrumbs = useMemo(
      function generateBreadcrumbs() {
        const asPathNestedRoutes = generatePathParts(router.asPath);
        const pathnameNestedRoutes = generatePathParts(router.pathname);

        const crumbList = asPathNestedRoutes.map((subpath, idx) => {
          const param = pathnameNestedRoutes[idx]
            .replace('[', '')
            .replace(']', '');

          const href = '/' + asPathNestedRoutes.slice(0, idx + 1).join('/');
          return {
            href,
            textGenerator: getTextGenerator(param, router.query),
            text: getDefaultTextGenerator(subpath, href),
          };
        });

        return [...crumbList];
      },
      [
        router.asPath,
        router.pathname,
        router.query,
        getTextGenerator,
        getDefaultTextGenerator,
      ]
    );
    return (
      <div className="container">
        <ul className={cls.breadcrumbs}>
          <li className={cls.breadcrumbs__item}>
            <Link href={Paths.DASHBOARD} passHref legacyBehavior>
              <a>
                <span
                  className={clsx(cls.breadcrumbs__item__icon, darkModeClass)}
                  style={{ marginRight: 0 }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12.6667 13.9993H3.33341C3.1566 13.9993 2.98703 13.9291 2.86201 13.804C2.73699 13.679 2.66675 13.5094 2.66675 13.3326V7.33263H0.666748L7.55141 1.07396C7.67415 0.962281 7.83414 0.900391 8.00008 0.900391C8.16603 0.900391 8.32601 0.962281 8.44875 1.07396L15.3334 7.33263H13.3334V13.3326C13.3334 13.5094 13.2632 13.679 13.1382 13.804C13.0131 13.9291 12.8436 13.9993 12.6667 13.9993ZM4.00008 12.666H12.0001V6.10396L8.00008 2.46796L4.00008 6.10396V12.666Z" />
                  </svg>
                </span>
              </a>
            </Link>
          </li>

          {breadcrumbs.map((crumb, idx) =>
            crumb.text ? (
              <li
                key={idx}
                className={clsx(cls.breadcrumbs__item, darkModeClass)}
              >
                {/**eslint-disable-next-line @typescript-eslint/ban-ts-comment
                 * @ts-ignore */}
                <Crumb
                  {...crumb}
                  key={idx}
                  last={idx === breadcrumbs.length - 1}
                />
              </li>
            ) : (
              ''
            )
          )}
        </ul>
      </div>
    );
  }
);
