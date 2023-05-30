import { FC } from 'react';
import classnames from 'classnames';
import { shallow } from 'zustand/shallow';

import styles from './StatusMarker.module.scss';
import { usePlaygroundStore } from 'store/usePlaygroundStore';

export const StatusMarker: FC = () => {
  const [isSuccess, responseStatus] = usePlaygroundStore(
    (state) => [state.isSuccess, state.responseStatus],
    shallow
  );

  return (
    <div className={styles.statusMarker}>
      <span
        className={classnames(styles.statusPin, {
          [styles.error]: isSuccess !== undefined && !isSuccess,
          [styles.success]: !!isSuccess,
        })}
      />
      <span>Response status</span>
      <span
        className={classnames(styles.statusCode, {
          [styles.errorCode]: isSuccess !== undefined && !isSuccess,
          [styles.successCode]: !!isSuccess,
        })}
      >
        {!!responseStatus ? responseStatus : `"not requested"`}
      </span>
    </div>
  );
};
