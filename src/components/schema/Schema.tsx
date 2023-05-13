import { FC, ReactNode, useState } from 'react';
import {
  buildClientSchema,
  GraphQLArgument,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInputType,
  GraphQLOutputType,
  GraphQLField /* getIntrospectionQuery */,
} from 'graphql';
import schemaData from './schemaData.json';

const data = JSON.parse(JSON.stringify(schemaData)).data;
const schema = buildClientSchema(data);
const fields = schema.getQueryType()?.getFields();

export const Schema: FC = () => {
  const [contentType, setContentType] = useState<string>('Query');
  // const [prevContentType, setPrevContentType] = useState<ReactNode>(null);

  // console.log(getIntrospectionQuery());
  // console.log(schema.getQueryType()?.getFields().location);

  // console.log(contentType);
  return (
    <>
      {contentType === 'Query' &&
        fields &&
        Object.keys(fields as object).map((key) => (
          <div key={key}>
            <Field field={fields[key]} changeContent={setContentType} />
          </div>
        ))}
      {}
    </>
  );
};

const Field = ({
  field,
  changeContent,
}: {
  field: GraphQLField<unknown, unknown>;
  changeContent: (newContentTypeName: string) => void;
}) => {
  return (
    <>
      <div>
        <span style={{ color: 'blue' }}>{`${field?.name}`}</span>
        (
        <Arguments args={field?.args} changeContent={changeContent} />){`: `}
        <GraphqlType inputType={field.type} changeContent={changeContent} />
      </div>
      <div>{field?.description}</div>
      <br />
    </>
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
      {args?.map((arg, index) => {
        const children = (
          <>
            {' '}
            <span style={{ color: 'magenta' }}>{`${arg.name}: `}</span>
            <GraphqlType inputType={arg.type} changeContent={changeContent} />
            {index !== args.length - 1 && ', '}
          </>
        );

        return args.length === 1 ? (
          <span key={arg.name}>{children}</span>
        ) : (
          <div style={{ paddingLeft: '10px' }} key={arg.name}>
            {children}
          </div>
        );
      })}
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
        style={{ color: 'orange', cursor: 'pointer' }}
        onClick={() => changeContent && 'name' in type && changeContent(type.name)}
      >{`${type.name}`}</span>
    );
};
