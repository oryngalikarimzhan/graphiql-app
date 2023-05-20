import { IntrospectionQuery } from 'graphql';

export interface SchemaSectionProps {
  schema: Data;
  isLoading: boolean;
}

interface Data {
  data: IntrospectionQuery;
}
