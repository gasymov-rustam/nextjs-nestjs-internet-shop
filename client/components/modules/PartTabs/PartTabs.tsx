import clsx from 'clsx';
import { useStore } from 'effector-react';
import { motion } from 'framer-motion';
import { memo, useState } from 'react';

import { $boilerPart } from '../../../context/boilerPart';
import { useTheme } from '../../../hooks';

import cls from '@/components/templates/PartPage/PartPage.module.scss';

export const PartTabs = memo(() => {
  const { mode } = useTheme();
  const boilerPart = useStore($boilerPart);
  const darkModeClass = { [cls.dark_mode]: mode === 'dark' };
  const [showDescription, setShowDescription] = useState(true);
  const [showCompatibility, setShowCompatibility] = useState(false);

  const handleShowDescription = () => {
    setShowDescription(true);
    setShowCompatibility(false);
  };

  const handleShowCompatibility = () => {
    setShowDescription(false);
    setShowCompatibility(true);
  };

  return (
    <div className={cls.part__tabs}>
      <div className={clsx(cls.part__tabs__controls, darkModeClass)}>
        <button
          className={showDescription ? cls.active : ''}
          onClick={handleShowDescription}
        >
          Description
        </button>

        <button
          className={showCompatibility ? cls.active : ''}
          onClick={handleShowCompatibility}
        >
          Compatibility
        </button>
      </div>

      {showDescription && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cls.part__tabs__content}
        >
          <h3 className={clsx(cls.part__tabs__content__title, darkModeClass)}>
            {boilerPart.name}
          </h3>

          <p className={clsx(cls.part__tabs__content__text, darkModeClass)}>
            {boilerPart.description}
          </p>
        </motion.div>
      )}

      {showCompatibility && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cls.part__tabs__content}
        >
          <p className={clsx(cls.part__tabs__content__text, darkModeClass)}>
            {boilerPart.compatibility}
          </p>
        </motion.div>
      )}
    </div>
  );
});
