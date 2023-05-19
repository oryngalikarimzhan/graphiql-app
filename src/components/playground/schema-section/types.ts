import { IntrospectionQuery } from 'graphql';

export interface SchemaSectionProps {
  schema: Data;
  isFetching: boolean;
}

interface Data {
  data: IntrospectionQuery;
}
