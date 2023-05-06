import { useEffect, useState, FC } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import styles from './Header.module.scss';
import { LanguageSelector } from '../language-selector/LanguageSelector';
import Navbar from '../navbar/Navbar';

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
        <Navbar sticky={sticky} />
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
