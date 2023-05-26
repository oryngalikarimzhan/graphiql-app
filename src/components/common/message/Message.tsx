import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';

import styles from './Message.module.scss';

interface MessageProps {
  isError?: boolean;
  className?: string;
  children?: ReactNode;
}

export const Message: FC<MessageProps> = ({ children, className, isError = false }) => {
  return <p className={classNames(className, { [styles.messageError]: isError })}>{children}</p>;
};
