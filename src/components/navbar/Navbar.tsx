import { FC, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';

import styles from './Navbar.module.scss';

const Navbar: FC = () => {
  const [navBurger, setNavBurger] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as HTMLElement)) {
      setNavBurger(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [menuRef]);

  return (
    <>
      <AiOutlineMenu
        className={classNames(styles.menuIcon, { [styles.active]: !navBurger })}
        size={'25'}
        onClick={() => setNavBurger(true)}
      />
      <AiOutlineClose
        className={classNames(styles.menuIcon, { [styles.active]: navBurger })}
        size={'25'}
        onClick={() => setNavBurger(false)}
      />
      <nav className={classNames(styles.nav, { [styles.active]: navBurger })} ref={menuRef}>
        <NavLink className={styles.navLink} to={''}>
          {`${t('welcome-page')}`}
        </NavLink>
        <NavLink className={styles.navLink} to={''}>
          {`${t('main-page')}`}
        </NavLink>
      </nav>
    </>
  );
};

export default Navbar;
