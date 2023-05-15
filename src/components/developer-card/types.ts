import { ReactNode } from 'react';

export interface IDevCardProps {
  image: string;
  name: string;
  avatarLink: string;
  description?: string;
  children?: ReactNode;
}
