import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { FancyButton } from '../fancy-button/FancyButton';

interface LinkButtonProps {
  to: string;
  children: ReactNode;
  className?: string;
}

export const LinkButton: FC<LinkButtonProps> = ({ to, children, className }) => {
  return (
    <Link to={to}>
      <FancyButton className={className}>{children}</FancyButton>
    </Link>
  );
};
