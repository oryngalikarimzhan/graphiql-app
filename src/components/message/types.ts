import { ReactNode } from 'react';

export interface IMessageProps {
  isError?: boolean;
  className?: string;
  children?: ReactNode;
}
