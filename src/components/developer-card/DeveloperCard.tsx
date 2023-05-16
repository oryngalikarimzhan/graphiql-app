import React, { FC } from 'react';

import styles from './DeveloperCard.module.scss';
import { IDevCardProps } from './types';
import Avatar from '../avatar/Avatar';

const DeveloperCard: FC<IDevCardProps> = ({ image, name, avatarLink, description }) => {
  return (
    <div className={styles.cardContainer}>
      <a href={avatarLink} target={'_blank'} rel="noreferrer">
        <Avatar image={image}></Avatar>
      </a>
      <h4>{name}</h4>
      <div className={styles.developerCardDescription}>{description}</div>
    </div>
  );
};

export default DeveloperCard;
