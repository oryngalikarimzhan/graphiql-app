import { ReactNode } from 'react';

export interface ISquareButtonProps {
  children: ReactNode;
  isActive?: boolean;
  className?: string;
  onClick?: () => void;
}
