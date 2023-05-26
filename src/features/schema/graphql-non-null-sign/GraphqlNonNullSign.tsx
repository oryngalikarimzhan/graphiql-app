import { FC, ReactNode } from 'react';

interface GraphqlNonNullSignProps {
  children: ReactNode;
}

export const GraphqlNonNullSign: FC<GraphqlNonNullSignProps> = ({ children }) => (
  <>
    {children}
    <span>!</span>
  </>
);
