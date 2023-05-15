import { FC, ReactNode, useState } from 'react';
import {
  buildClientSchema,
  GraphQLArgument,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInputType,
  GraphQLOutputType,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLScalarType,
  GraphQLField /* getIntrospectionQuery */,
  GraphQLInputField,
} from 'graphql';

import styles from './Schema.module.scss';
import schemaData from './schemaData.json';
import { ReactComponent as TypeIcon } from '../../assets/icons/type-icon.svg';
import { ReactComponent as ArgumentIcon } from '../../assets/icons/argument-icon.svg';
import { ReactComponent as FieldIcon } from '../../assets/icons/field-icon.svg';

const data = JSON.parse(JSON.stringify(schemaData)).data;
const schema = buildClientSchema(data);
// const fields = schema.getQueryType()?.getFields();

export const Schema: FC = () => {
  const [contentType, setContentType] = useState<string>('Query');
  // const [prevContentType, setPrevContentType] = useState<ReactNode>(null);

  // console.log(getIntrospectionQuery());
  // console.log(contentType);

  const type = schema.getType(contentType);

  console.log(type);

  if (!type) {
    const queryTypeFields = schema.getQueryType()?.getFields();
    if (queryTypeFields && contentType in queryTypeFields) {
      const field = queryTypeFields?.[contentType];

      return (
        <div
          /** CHANGE TO FRAGMENT AT THE END */ style={{
            width: '33%',
            marginLeft: '70px',
            padding: '20px',
            backgroundColor: '#202a3b',
          }}
        >
          <div className={styles.field}>
            <div className={styles.title}>
              <TypeIcon height={16} width={16} />
              <span>Type</span>
            </div>

            <GraphqlType inputType={field.type} />

            <div className={styles.title}>
              <ArgumentIcon height={16} width={16} />
              <span>Arguments</span>
            </div>
            <div>
              <Arguments args={field.args} changeContent={setContentType} />
            </div>
          </div>
        </div>
      );
    }
  }

  if (type instanceof GraphQLObjectType || type instanceof GraphQLInputObjectType) {
    const fields = type.getFields();

    return (
      <div
        /** CHANGE TO FRAGMENT AT THE END */ style={{
          width: '33%',
          marginLeft: '70px',
          padding: '20px',
          backgroundColor: '#202a3b',
        }}
      >
        {fields && (
          <>
            <div className={styles.title}>
              <ArgumentIcon height={16} width={16} />
              <span>Fields</span>
            </div>
            {Object.keys(fields as object).map((key) => (
              <div key={key}>
                <Field field={fields![key]} changeContent={setContentType} />
              </div>
            ))}
          </>
        )}
      </div>
    );
  }

  if (type instanceof GraphQLScalarType) {
    return (
      <div
        /** CHANGE TO FRAGMENT AT THE END */ style={{
          width: '33%',
          marginLeft: '70px',
          padding: '20px',
          backgroundColor: '#202a3b',
        }}
      >
        <div className={styles.field}>
          <div className={styles.scalarName}>{type.name}</div>
          <div
            className={styles.scalarDescription}
            dangerouslySetInnerHTML={{
              __html: type.description?.replace(/`([^`]+)`/g, '<code>$1</code>') || '',
            }}
          ></div>
        </div>
      </div>
    );
  }

  return <div>Do not have schema</div>;
};

const Field = ({
  field,
  changeContent,
}: {
  field: GraphQLField<unknown, unknown> | GraphQLInputField;
  changeContent: (newContentTypeName: string) => void;
}) => {
  return (
    <div className={styles.field}>
      <div>
        <span onClick={() => changeContent(field.name)} className={styles.fieldName}>
          {field.name}
        </span>

        {'args' in field && field.args.length > 0 && (
          <>
            (
            <Arguments args={field.args} changeContent={changeContent} />)
          </>
        )}

        {`: `}

        <GraphqlType inputType={field.type} changeContent={changeContent} />
      </div>

      {field.description && <div>{field.description}</div>}
    </div>
  );
};

const Arguments = ({
  args,
  changeContent,
}: {
  args?: readonly GraphQLArgument[];
  changeContent?: (newContentType: string) => void;
}) => {
  return (
    <span>
      {/* ( */}
      {args?.map((arg, index) => {
        const children = (
          <>
            <span className={styles.argName}>{arg.name}</span>
            {`: `}
            <GraphqlType inputType={arg.type} changeContent={changeContent} />
            {index !== args.length - 1 && ', '}
          </>
        );

        return args.length === 1 ? (
          <span key={arg.name}>{children}</span>
        ) : (
          <div className={styles.argBlock} key={arg.name}>
            {children}
          </div>
        );
      })}
      {/* ) */}
    </span>
  );
};

const NonNullPostfix: FC<{ children: ReactNode }> = ({ children }) => (
  <>
    {children}
    <span>!</span>
  </>
);

const ListSquareBrackets: FC<{ children: ReactNode }> = ({ children }) => (
  <>
    <span>[</span>
    {children}
    <span>]</span>
  </>
);

const GraphqlType: FC<{
  inputType: GraphQLInputType | GraphQLOutputType;
  changeContent?: (newContentType: string) => void;
}> = ({ inputType, changeContent }) => {
  let type = inputType;
  const layers: string[] = [];

  while ('ofType' in type) {
    if (type instanceof GraphQLNonNull) {
      layers.push(type[Symbol.toStringTag]);
    } else if (type instanceof GraphQLList) {
      layers.push(type[Symbol.toStringTag]);
    }

    type = type.ofType;
  }

  return layers
    .reverse()
    .reduce(
      (prev, curr) =>
        curr === 'GraphQLList' ? (
          <ListSquareBrackets>{prev}</ListSquareBrackets>
        ) : (
          <NonNullPostfix>{prev}</NonNullPostfix>
        ),
      <span
        className={styles.type}
        onClick={() => changeContent && 'name' in type && changeContent(type.name)}
      >{`${type.name}`}</span>
    );
};
