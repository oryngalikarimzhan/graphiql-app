import React, { FC } from 'react';
import classNames from 'classnames';

import styles from './Message.module.scss';
import { IMessageProps } from './types';

const Message: FC<IMessageProps> = ({ children, className, isError = false }) => {
  return <p className={classNames(className, { [styles.messageError]: isError })}>{children}</p>;
};

export default Message;
