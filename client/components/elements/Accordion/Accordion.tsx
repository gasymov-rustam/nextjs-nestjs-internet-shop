import { AnimatePresence, motion } from 'framer-motion';
import { memo, useState } from 'react';

interface AccordionProps {
  children: React.ReactNode;
  title: string | false;
  titleClass: string;
  arrowOpenClass?: string;
  isMobileForFilters?: boolean;
  hideArrowClass?: string;
  callback?: (expanded: boolean) => void;
}

export const Accordion = memo((props: AccordionProps) => {
  const {
    children,
    title,
    titleClass,
    arrowOpenClass,
    isMobileForFilters,
    hideArrowClass,
    callback,
  } = props;

  const [expanded, setExpanded] = useState(false);

  const toggleAccordion = () => {
    if (callback) {
      callback(expanded);
    }

    setExpanded((prev) => !prev);
  };

  return (
    <>
      {title &&
        (isMobileForFilters ? (
          <button className={`${titleClass} ${hideArrowClass}`}>{title}</button>
        ) : (
          <motion.button
            initial={false}
            onClick={toggleAccordion}
            className={`${titleClass} ${
              expanded ? (isMobileForFilters ? '' : arrowOpenClass) : ''
            }`}
          >
            {title}
          </motion.button>
        ))}

      <AnimatePresence initial={false}>
        {(isMobileForFilters || expanded) && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            style={{ overflow: 'hidden' }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});
