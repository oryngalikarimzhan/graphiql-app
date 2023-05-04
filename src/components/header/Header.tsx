import React, { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import classNames from 'classnames';

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
        <div className={styles.container}>Header</div>
      </header>
    </>
  );
}
