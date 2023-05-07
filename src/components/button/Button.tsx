import { FC, ReactNode } from 'react';
import classnames from 'classnames';

import styles from './Button.module.scss';

interface IButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Button: FC<IButtonProps> = ({ children, className, onClick }) => {
  return (
    <button className={classnames(styles.button, className)} onClick={onClick}>
      {children}
    </button>
  );
};
