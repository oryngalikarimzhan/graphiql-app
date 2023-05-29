import { FC } from 'react';
import classnames from 'classnames';
import { shallow } from 'zustand/shallow';

import styles from './StatusMarker.module.scss';
import { usePlaygroundStore } from 'store/usePlaygroundStore';

export const StatusMarker: FC = () => {
  const [isSuccess, statusCode] = usePlaygroundStore(
    (state) => [state.isSuccess, state.statusCode],
    shallow
  );

  return (
    <div className={styles.statusMarker}>
      <span className={classnames(styles.statusPin, { [styles.errorPin]: !isSuccess })} />
      <span>Response status</span>
      <span className={classnames(styles.statusCode, { [styles.errorStatusCode]: !isSuccess })}>
        {statusCode}
      </span>
    </div>
  );
};
