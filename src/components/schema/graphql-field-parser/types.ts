import { GraphQLField, GraphQLInputField } from 'graphql';

export interface IGraphqlFieldParserProps {
  field: GraphQLField<unknown, unknown> | GraphQLInputField;
}
