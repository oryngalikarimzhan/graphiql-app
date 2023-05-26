import { FC, HTMLAttributes, ReactNode } from 'react';
import classnames from 'classnames';

import styles from './RectangularButton.module.scss';

interface RectangularButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isActive?: boolean;
  className?: string;
  onClick?: () => void;
}

export const RectangularButton: FC<RectangularButtonProps> = ({
  children,
  isActive = false,
  className,
  onClick,
  ...props
}) => {
  return (
    <button
      {...props}
      className={classnames(styles.rectangularButton, className, {
        [styles.rectangularButtonActive]: isActive,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
