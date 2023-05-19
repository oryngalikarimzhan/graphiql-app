import { FC } from 'react';
import classnames from 'classnames';

import styles from './RectangularButton.module.scss';
import { IRectangularButtonProps } from './types';

export const RectangularButton: FC<IRectangularButtonProps> = ({
  children,
  isActive = false,
  className,
  onClick,
}) => {
  return (
    <button
      className={classnames(styles.rectangularButton, className, {
        [styles.rectangularButtonActive]: isActive,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
