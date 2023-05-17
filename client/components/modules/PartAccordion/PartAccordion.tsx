import clsx from 'clsx';
import { memo } from 'react';

import { useTheme } from '../../../hooks';
import { Accordion } from '../../elements';

import cls from '@/components/templates/PartPage/PartPage.module.scss';

interface PartAccordionProps {
  title: string;
  children: React.ReactNode;
}

export const PartAccordion = memo(({ title, children }: PartAccordionProps) => {
  const { mode } = useTheme();
  const darkModeClass = { [cls.dark_mode]: mode === 'dark' };

  const handleExpandAccordion = (expanded: boolean) => {
    const accordionTitles = document.querySelectorAll(
      `.${cls.part__accordion__title}`
    );

    accordionTitles.forEach((title) => {
      const item = title as HTMLElement;

      if (expanded) {
        item.style.borderBottomLeftRadius = '4px';
        item.style.borderBottomRightRadius = '4px';
      } else {
        item.style.borderBottomLeftRadius = '0';
        item.style.borderBottomRightRadius = '0';
      }
    });
  };

  return (
    <Accordion
      title={title}
      titleClass={clsx(cls.part__accordion__title, darkModeClass)}
      arrowOpenClass={cls.open}
      // boxShadowStyle="0px 2px 8px rgba(0, 0, 0, 0.1)"
      callback={handleExpandAccordion}
    >
      {children}
    </Accordion>
  );
});
