import { FC } from 'react';
import classnames from 'classnames';

import styles from './StatusMarker.module.scss';
import { usePlaygroundStore } from 'store/usePlaygroundStore';

export const StatusMarker: FC = () => {
  const [isSuccess, statusCode] = usePlaygroundStore((state) => [
    state.isSuccess,
    state.statusCode,
  ]);

  return (
    <div className={styles.statusMarker}>
      <span className={classnames(styles.statusPin, { [styles.errorPin]: !isSuccess })} />
      <span>Status</span>
      <span className={classnames(styles.statusCode, { [styles.errorStatusCode]: !isSuccess })}>
        {statusCode}
      </span>
    </div>
  );
};
