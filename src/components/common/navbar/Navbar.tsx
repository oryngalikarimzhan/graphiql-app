import { FC, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import styles from './Navbar.module.scss';
import { ReactComponent as HamburgerIcon } from 'assets/icons/hamburger-icon.svg';
import { ReactComponent as CloseIcon } from 'assets/icons/close-icon.svg';
import { useUserAuthStore } from '../../../features/auth/userAuthStore';

export const Navbar: FC = () => {
  const user = useUserAuthStore((state) => state.user);
  const [isNavBurgerOpen, setIsNavBurgerOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();

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

  const defineActive = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.navLink, { [styles.active]: isActive });

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
        <NavLink className={defineActive} to={'/'}>
          {t('landing.page')}
        </NavLink>
        {user && (
          <NavLink className={defineActive} to={'/main'}>
            {t('studio.page')}
          </NavLink>
        )}
      </nav>
    </>
  );
};
