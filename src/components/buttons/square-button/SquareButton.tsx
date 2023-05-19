import { FC } from 'react';
import classnames from 'classnames';

import styles from './SquareButton.module.scss';
import { ISquareButtonProps } from './types';

export const SquareButton: FC<ISquareButtonProps> = ({
  children,
  isActive = false,
  className,
  onClick,
}) => {
  return (
    <button
      className={classnames(className, styles.squareButton, {
        [styles.squareButtonActive]: isActive,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
