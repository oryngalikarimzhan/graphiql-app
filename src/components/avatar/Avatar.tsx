import React, { FC } from 'react';

import styles from './Avatar.module.scss';
import { IAvatarProps } from './types';

const Avatar: FC<IAvatarProps> = ({ image }) => {
  return (
    <div className={styles.avatarContainer}>
      <img className={styles.avatarImage} src={image} alt="user image" />
    </div>
  );
};

export default Avatar;
