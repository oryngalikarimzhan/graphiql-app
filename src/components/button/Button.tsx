import { FC, ReactNode } from 'react';
import classnames from 'classnames';

import styles from './Button.module.scss';

interface IButtonProps {
  children: ReactNode;
  className: string;
}

export const Button: FC<IButtonProps> = ({ children, className }) => {
  return <button className={classnames(styles.button, className)}>{children}</button>;
};
