import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { IntrospectionQuery } from 'graphql';

export interface SchemaSectionProps {
  schema: Data;
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
}

interface Data {
  data: IntrospectionQuery;
}
