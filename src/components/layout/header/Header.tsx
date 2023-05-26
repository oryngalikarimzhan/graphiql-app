import { useEffect, useState, FC } from 'react';
import classnames from 'classnames';

import styles from './Header.module.scss';
import { LanguageSelector } from 'features/localization/language-selector/LanguageSelector';
import { AuthControls } from 'features/auth/auth-controls/AuthControls';
import { Navbar } from 'components/routing/navbar/Navbar';

export const Header: FC = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      window.pageYOffset > 0 ? setIsSticky(true) : setIsSticky(false);
    };
    window.addEventListener('scroll', handleScroll);
    return document.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={classnames(styles.header, { [styles.sticky]: isSticky })}>
      <div className={classnames('wrapper', styles.container)}>
        <Navbar />

        <div className={styles.headerButtons}>
          <LanguageSelector
            className={classnames(styles.language, { [styles.inverted]: isSticky })}
          />
          <AuthControls className={classnames(styles.auth, { [styles.inverted]: isSticky })} />
        </div>
      </div>
    </header>
  );
};
