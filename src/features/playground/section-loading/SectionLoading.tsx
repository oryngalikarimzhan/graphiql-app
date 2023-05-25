import { FC } from 'react';
import { HashLoader } from 'react-spinners';

import styles from '../Playground.module.scss';

export const SectionLoading: FC = () => {
  return (
    <div className={styles.center}>
      <HashLoader color="#a836d6" size={80} />
    </div>
  );
};
