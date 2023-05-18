import { FC, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { ReactComponent as HamburgerIcon } from '../../assets/icons/hamburger-icon.svg';
import { ReactComponent as CloseIcon } from '../../assets/icons/close-icon.svg';

import styles from './Navbar.module.scss';

const Navbar: FC = () => {
  const [isNavBurgerOpen, setIsNavBurgerOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();

  const defineActive = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.navLink, { [styles.active]: isActive });

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as HTMLElement)) {
        setIsNavBurgerOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick, true);
    return () => {
      document.removeEventListener('click', handleOutsideClick, true);
    };
  }, [menuRef]);

  return (
    <>
      <HamburgerIcon
        height={25}
        width={25}
        className={classNames(styles.burgerIcon, { [styles.burgerIconVisible]: !isNavBurgerOpen })}
        onClick={() => setIsNavBurgerOpen(true)}
      />
      <CloseIcon
        height={25}
        width={25}
        className={classNames(styles.burgerIcon, { [styles.burgerIconVisible]: isNavBurgerOpen })}
      />
      <nav
        className={classNames(styles.nav, { [styles.navActive]: isNavBurgerOpen })}
        ref={menuRef}
      >
        <NavLink className={defineActive} to={'/welcome'}>
          {t('welcome-page')}
        </NavLink>
        <NavLink className={defineActive} to={'/main'}>
          {t('main-page')}
        </NavLink>
      </nav>
    </>
  );
};

export default Navbar;
