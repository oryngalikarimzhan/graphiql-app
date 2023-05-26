import { FC, HTMLAttributes, ReactNode } from 'react';
import classnames from 'classnames';

import styles from './SquareButton.module.scss';

interface SquareButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isActive?: boolean;
  className?: string;
  onClick?: () => void;
}

export const SquareButton: FC<SquareButtonProps> = ({
  children,
  isActive = false,
  className,
  onClick,
  ...props
}) => {
  return (
    <button
      {...props}
      className={classnames(className, styles.squareButton, {
        [styles.squareButtonActive]: isActive,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
