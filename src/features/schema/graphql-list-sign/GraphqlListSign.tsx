import { FC, ReactNode } from 'react';

interface IGraphqlListSignProps {
  children: ReactNode;
}

export const GraphqlListSign: FC<IGraphqlListSignProps> = ({ children }) => (
  <>
    <span>[</span>
    {children}
    <span>]</span>
  </>
);
