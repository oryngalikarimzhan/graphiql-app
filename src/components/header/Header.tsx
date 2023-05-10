import { useEffect, useState, FC } from 'react';
import classNames from 'classnames';

import styles from './Header.module.scss';
import { LanguageSelector } from '../language-selector/LanguageSelector';
import Navbar from '../navbar/Navbar';
import AuthButton from '../auth-button/AuthButton';

const Header: FC = () => {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      window.pageYOffset > 60 ? setSticky(true) : setSticky(false);
    };
    window.addEventListener('scroll', handleScroll);
    return window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={classNames(styles.header, { [styles.sticky]: sticky })}>
      <div className={styles.container}>
        <Navbar />
        <div className={styles.btns}>
          <LanguageSelector />
          <AuthButton className={styles.auth} />
        </div>
      </div>
    </header>
  );
};

export default Header;
