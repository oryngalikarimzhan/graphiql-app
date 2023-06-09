import { useEffect, useState, FC } from 'react';
import classnames from 'classnames';

import styles from './Header.module.scss';
import { LanguageSelector } from 'components/localization/language-selector/LanguageSelector';
import { AuthControlButtons } from 'components/auth/auth-control-buttons/AuthControlButtons';
import { Navbar } from 'components/common/navbar/Navbar';

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
          <AuthControlButtons
            className={classnames(styles.auth, { [styles.inverted]: isSticky })}
          />
        </div>
      </div>
    </header>
  );
};
