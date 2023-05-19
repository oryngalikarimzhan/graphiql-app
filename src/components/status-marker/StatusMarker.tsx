import { FC } from 'react';
import classnames from 'classnames';

import styles from './StatusMarker.module.scss';
import { useAppSelector } from '../../store/hooks';

export const StatusMarker: FC = () => {
  const isOk = useAppSelector((state) => state.playground.isSuccess);
  const statusCode = useAppSelector((state) => state.playground.status);

  return (
    <div className={styles.statusMarker}>
      <span className={classnames(styles.statusPin, { [styles.errorPin]: !isOk })} />
      <span>Status</span>
      <span className={classnames(styles.statusCode, { [styles.errorStatusCode]: !isOk })}>
        {statusCode}
      </span>
    </div>
  );
};
