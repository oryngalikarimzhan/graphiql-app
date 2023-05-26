import { FC } from 'react';
import { GraphQLField, GraphQLInputField } from 'graphql';

import styles from './GraphqlFieldParser.module.scss';
import { GraphqlArgumentsParser } from '../graphql-arguments-parser/GraphqlArgumentsParser';
import { GraphqlTypeParser } from '../graphql-type-parser/GraphqlTypeParser';
import { useSchemaStore } from 'store/schema/useSchemaStore';

interface GraphqlFieldParserProps {
  field: GraphQLField<unknown, unknown> | GraphQLInputField;
}

export const GraphqlFieldParser: FC<GraphqlFieldParserProps> = ({ field }) => {
  const setCurrentGraphqlType = useSchemaStore((state) => state.setCurrentGraphqlType);

  return (
    <div className={styles.field}>
      <div>
        <span onClick={() => setCurrentGraphqlType(field.name)} className={styles.fieldName}>
          {field.name}
        </span>

        {'args' in field && field.args.length > 0 && (
          <>
            (
            <GraphqlArgumentsParser args={field.args} />)
          </>
        )}

        {`: `}

        <GraphqlTypeParser inputType={field.type} />
      </div>

      {field.description && <div>{field.description}</div>}
    </div>
  );
};
