import { FC, ReactNode } from 'react';
import classnames from 'classnames';

import styles from './SquareButton.module.scss';

interface ISquareButtonProps {
  children: ReactNode;
  isActive?: boolean;
  className?: string;
  onClick?: () => void;
}

export const SquareButton: FC<ISquareButtonProps> = ({
  children,
  isActive = false,
  className,
  onClick,
}) => {
  return (
    <button
      className={classnames(styles.squareButton, className, {
        [styles.squareButtonActive]: isActive,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
