import { FC } from 'react';

import { IGraphqlListSignProps } from './types';

export const GraphqlListSign: FC<IGraphqlListSignProps> = ({ children }) => (
  <>
    <span>[</span>
    {children}
    <span>]</span>
  </>
);
