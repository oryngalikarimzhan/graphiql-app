import { useEffect, useState } from 'react';
import classNames from 'classnames';

import styles from './Header.module.scss';
import LogoutIcon from '../logoutIcon/LogoutIcon';

export default function Header() {
  const [sticky, setSticky] = useState(false);

  const handleScroll = () => {
    window.pageYOffset > 0 ? setSticky(true) : setSticky(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  });

  return (
    <>
      <header className={classNames(styles.header, { [styles.sticky]: sticky })}>
        <div className={styles.container}>
          <nav></nav>
          <div className={styles.logout}>
            <LogoutIcon sticky={sticky} />
          </div>
        </div>
      </header>
    </>
  );
}
