import { FC, ReactNode } from 'react';
import classnames from 'classnames';
import {
  buildClientSchema,
  GraphQLArgument,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInputType,
  GraphQLOutputType,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLField /* getIntrospectionQuery */,
  GraphQLInputField,
} from 'graphql';

import styles from './Schema.module.scss';
import schemaData from './schemaData.json';
import { ReactComponent as TypeIcon } from '../../assets/icons/type-icon.svg';
import { ReactComponent as ArgumentIcon } from '../../assets/icons/argument-icon.svg';
import { ReactComponent as FieldIcon } from '../../assets/icons/field-icon.svg';
import { ReactComponent as BackwardIcon } from '../../assets/icons/backward-icon.svg';
import { SquareButton } from '../buttons/square-button/SquareButton';
import { useActions, useAppSelector } from '../../store/hooks';

const data = JSON.parse(JSON.stringify(schemaData)).data;
const schema = buildClientSchema(data);

export const Schema: FC = () => {
  const { currentType } = useAppSelector((state) => state.schema);

  if (!schema) return <div className={styles.schema}>Do not have schema</div>;

  const type = schema.getType(currentType);

  if (!type) {
    const queryTypeFields = schema.getQueryType()?.getFields();

    if (queryTypeFields && currentType in queryTypeFields) {
      const field = queryTypeFields[currentType];

      return (
        <div className={styles.schema}>
          <div className={styles.schemaHeading}>
            <div className={styles.name}>{field.name}</div>
            <PreviousButton />
          </div>

          <div>{field.description}</div>
          <div className={styles.title}>
            <TypeIcon height={16} width={16} />
            <span>Type</span>
          </div>
          <div className={styles.field}>
            <GraphqlTypeParser inputType={field.type} />
          </div>
          <div className={styles.title}>
            <ArgumentIcon height={16} width={16} />
            <span>Arguments</span>
          </div>
          <div className={styles.field}>
            <GraphqlArgumentsParser args={field.args} />
          </div>
        </div>
      );
    }
  }

  if (type instanceof GraphQLObjectType || type instanceof GraphQLInputObjectType) {
    const fields = type.getFields();

    return (
      <div className={styles.schema}>
        {fields && (
          <>
            <div className={styles.schemaHeading}>
              <div className={styles.name}>{type.name}</div>
              <PreviousButton />
            </div>

            <div className={styles.title}>
              <FieldIcon height={16} width={16} />
              <span>Fields</span>
            </div>
            {Object.keys(fields).map((key) => (
              <div key={key}>
                <GraphqlFieldParser field={fields![key]} />
              </div>
            ))}
          </>
        )}
      </div>
    );
  }

  return (
    <div className={styles.schema}>
      <div className={styles.schemaHeading}>
        <div className={styles.name}>{type?.name}</div>
        <PreviousButton />
      </div>

      <div className={styles.field}>
        <div
          className={styles.scalarDescription}
          dangerouslySetInnerHTML={{
            __html: type?.description?.replace(/`([^`]+)`/g, '<code>$1</code>') || '',
          }}
        ></div>
      </div>
    </div>
  );
};

const GraphqlFieldParser: FC<{
  field: GraphQLField<unknown, unknown> | GraphQLInputField;
}> = ({ field }) => {
  const { setCurrentGraphqlType } = useActions();

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

const GraphqlArgumentsParser: FC<{
  args?: readonly GraphQLArgument[];
}> = ({ args }) => {
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

const GraphqlTypeParser: FC<{
  inputType: GraphQLInputType | GraphQLOutputType;
}> = ({ inputType }) => {
  const { setCurrentGraphqlType } = useActions();
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

const GraphqlNonNullSign: FC<{ children: ReactNode }> = ({ children }) => (
  <>
    {children}
    <span>!</span>
  </>
);

const GraphqlListSign: FC<{ children: ReactNode }> = ({ children }) => (
  <>
    <span>[</span>
    {children}
    <span>]</span>
  </>
);

const PreviousButton: FC = () => {
  const { previousType } = useAppSelector((state) => state.schema);
  const { getPreviousGraphqlType } = useActions();
  return (
    <>
      {previousType !== '' && (
        <SquareButton className={styles.previousButton} onClick={() => getPreviousGraphqlType()}>
          <BackwardIcon /> {previousType}
        </SquareButton>
      )}
    </>
  );
};
