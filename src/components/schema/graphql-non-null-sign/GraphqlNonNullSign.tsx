import { FC } from 'react';

import { IGraphqlNonNullSignProps } from './types';

export const GraphqlNonNullSign: FC<IGraphqlNonNullSignProps> = ({ children }) => (
  <>
    {children}
    <span>!</span>
  </>
);
