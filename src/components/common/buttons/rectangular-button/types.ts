import { ReactNode } from 'react';

export interface IRectangularButtonProps {
  children: ReactNode;
  isActive?: boolean;
  className?: string;
  onClick?: () => void;
}
