import { FC } from 'react';
import { GraphQLInputType, GraphQLOutputType } from 'graphql';

import styles from './GraphqlTypeParser.module.scss';
import { GraphqlListSign } from '../graphql-list-sign/GraphqlListSign';
import { GraphqlNonNullSign } from '../graphql-non-null-sign/GraphqlNonNullSign';
import { useSchemaStore } from 'store/useSchemaStore';

interface GraphqlTypeParserProps {
  inputType: GraphQLInputType | GraphQLOutputType;
}

export const GraphqlTypeParser: FC<GraphqlTypeParserProps> = ({ inputType }) => {
  const setCurrentGraphqlType = useSchemaStore((state) => state.setCurrentGraphqlType);

  let type = inputType;
  const layers: string[] = [];

  while ('ofType' in type) {
    layers.push(type[Symbol.toStringTag]);
    type = type.ofType;
  }

  return layers
    .reverse()
    .reduce(
      (prev, curr) =>
        curr === 'GraphQLList' ? (
          <GraphqlListSign>{prev}</GraphqlListSign>
        ) : (
          <GraphqlNonNullSign>{prev}</GraphqlNonNullSign>
        ),
      <span
        className={styles.type}
        onClick={() => 'name' in type && setCurrentGraphqlType(type.name)}
      >{`${type.name}`}</span>
    );
};
