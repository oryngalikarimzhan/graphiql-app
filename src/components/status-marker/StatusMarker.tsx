import { FC } from 'react';
import classnames from 'classnames';

import styles from './StatusMarker.module.scss';

const { statusMarker, statusPin, errorPin, status, errorStatus } = styles;

interface IStatusMarkerProps {
  isOk: boolean;
  statusCode: number | string;
}

export const StatusMarker: FC<IStatusMarkerProps> = ({ isOk, statusCode }) => {
  return (
    <div className={statusMarker}>
      <span className={classnames(statusPin, { [errorPin]: !isOk })} />
      <span>Status</span>
      <span className={classnames(status, { [errorStatus]: !isOk })}>{statusCode}</span>
    </div>
  );
};
