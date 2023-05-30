import { FC, ReactNode } from 'react';
import classnames from 'classnames';

import styles from './FancyButton.module.scss';
import { RectangularButton } from '../rectangular-button/RectangularButton';

interface FancyButtonProps {
  children: ReactNode;
  className?: string;
}

export const FancyButton: FC<FancyButtonProps> = ({ children, className }) => {
  return (
    <RectangularButton className={classnames(styles.fancyButton, className)}>
      <span>{children}</span>
    </RectangularButton>
  );
};
