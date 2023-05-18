import { FC, ReactNode } from 'react';
import classnames from 'classnames';

import styles from './RectangularButton.module.scss';
import { SquareButton } from '../../buttons/square-button/SquareButton';

interface IRectangularButtonProps {
  children: ReactNode;
  isActive?: boolean;
  className?: string;
  onClick?: () => void;
}

export const RectangularButton: FC<IRectangularButtonProps> = ({
  children,
  isActive = false,
  className,
  onClick,
}) => {
  return (
    <SquareButton
      className={classnames(styles.rectangularButton, className)}
      isActive={isActive}
      onClick={onClick}
    >
      {children}
    </SquareButton>
  );
};
