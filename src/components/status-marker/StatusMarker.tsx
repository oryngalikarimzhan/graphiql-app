import { FC } from 'react';
import classnames from 'classnames';

import styles from './StatusMarker.module.scss';

interface IStatusMarkerProps {
  isOk: boolean;
  statusCode: number | string;
}

export const StatusMarker: FC<IStatusMarkerProps> = ({ isOk, statusCode }) => {
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
