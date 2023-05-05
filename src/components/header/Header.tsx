import { useEffect, useState, FC } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import styles from './Header.module.scss';
import { LanguageSelector } from '../language-selector/LanguageSelector';
import { NavLink } from 'react-router-dom';

const Header: FC = () => {
  const [sticky, setSticky] = useState(false);
  const { t } = useTranslation();

  const handleScroll = () => {
    window.pageYOffset > 0 ? setSticky(true) : setSticky(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  });

  return (
    <header className={classNames(styles.header, { [styles.sticky]: sticky })}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <NavLink className={classNames(styles.navLink, { [styles.stickyText]: sticky })} to={''}>
            Main Page
          </NavLink>
          <NavLink className={classNames(styles.navLink, { [styles.stickyText]: sticky })} to={''}>
            Welcome Page
          </NavLink>
        </nav>
        <div className={styles.btns}>
          <LanguageSelector />
          <div className={styles.logout}>
            <button className={styles.auth}>{`${t('sign-in')}`}</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
