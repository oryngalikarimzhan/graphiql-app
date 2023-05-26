import { FC } from 'react';
import classnames from 'classnames';
import { GraphQLArgument } from 'graphql';

import styles from './GraphqlArgumentsParser.module.scss';
import { GraphqlTypeParser } from '../graphql-type-parser/GraphqlTypeParser';

interface GraphqlArgumentsParserProps {
  args?: readonly GraphQLArgument[];
}

export const GraphqlArgumentsParser: FC<GraphqlArgumentsParserProps> = ({ args }) => {
  return (
    <>
      {args?.map((arg, index) => (
        <span key={arg.name} className={classnames({ [styles.argBlock]: args.length > 1 })}>
          <span className={styles.argName}>{arg.name}</span>
          {`: `}
          <GraphqlTypeParser inputType={arg.type} />
          {index !== args.length - 1 && ', '}
        </span>
      ))}
    </>
  );
};
