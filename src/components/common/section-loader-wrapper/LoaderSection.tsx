import { FC } from 'react';
import classnames from 'classnames';

import styles from './LoaderSection.module.scss';
import { SpinnerLoader } from '../spinner-loader/SpinnerLoader';

interface LoaderSectionProps {
  className?: string;
}

export const LoaderSection: FC<LoaderSectionProps> = ({ className }) => {
  return (
    <div className={classnames(styles.loaderSection, className)}>
      <SpinnerLoader />
    </div>
  );
};
