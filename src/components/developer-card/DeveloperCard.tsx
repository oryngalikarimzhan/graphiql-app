import React, { FC } from 'react';

import styles from './DeveloperCard.module.scss';
import { IDevCardProps } from './types';
import Avatar from '../avatar/Avatar';

const DeveloperCard: FC<IDevCardProps> = ({ image, name, avatarLink, description }) => {
  return (
    <div className={styles.cardContainer}>
      <a className={styles.image} href={avatarLink} target={'_blank'} rel="noreferrer">
        <Avatar image={image} />
      </a>

      <div className={styles.info}>
        <h4>{name}</h4>
        <p className={styles.developerCardDescription}>{description}</p>
      </div>
    </div>
  );
};

export default DeveloperCard;
