import React, { FC } from 'react';
import classNames from 'classnames';
import styles from './Message.module.scss';
import { IMessageProps } from './types';

const Message: FC<IMessageProps> = ({ children, className, isError = false }) => {
  return (
    <div className={classNames(className, { [styles.messageError]: isError })}>{children}</div>
  );
};

export default Message;
