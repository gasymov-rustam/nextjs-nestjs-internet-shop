import { memo } from 'react';

import { HeaderBottom, HeaderTop } from '../../modules';

import cls from './Header.module.scss';

export const Header = memo(() => (
  <header className={cls.header}>
    <HeaderTop />
    <HeaderBottom />
  </header>
));
