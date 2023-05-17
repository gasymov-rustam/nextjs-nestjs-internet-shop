import { memo } from 'react';

import Link from 'next/link';
import { Paths } from '../../../constants';
import cls from './Error.module.scss';

export const Error = memo(() => {
  return (
    <div className={cls.flexContainer}>
      <div className={cls.flexContainer}>
        <h1>
          <span className={cls.fadeIn} id="digit1">
            4
          </span>
          <span className={cls.fadeIn} id="digit2">
            0
          </span>
          <span className={cls.fadeIn} id="digit3">
            4
          </span>
        </h1>

        <h3 className={cls.fadeIn}>PAGE NOT FOUND</h3>

        <Link href={Paths.DASHBOARD} passHref legacyBehavior>
          <button type="button" name="button">
            Return To Home
          </button>
        </Link>
      </div>
    </div>
  );
});
