import { FC, useMemo } from 'react';
import {
  buildClientSchema,
  GraphQLObjectType,
  GraphQLInputObjectType,
  IntrospectionQuery,
  GraphQLScalarType,
  GraphQLInputFieldMap,
  GraphQLFieldMap,
  GraphQLField,
  GraphQLEnumType,
  GraphQLInterfaceType,
  GraphQLUnionType,
} from 'graphql';

import styles from './Schema.module.scss';
import { ReactComponent as TypeIcon } from 'assets/icons/type-icon.svg';
import { ReactComponent as ArgumentIcon } from 'assets/icons/argument-icon.svg';
import { ReactComponent as FieldIcon } from 'assets/icons/field-icon.svg';
import { ReactComponent as ValuesIcon } from 'assets/icons/values-icon.svg';
import { GraphqlTypeParser } from './graphql-type-parser/GraphqlTypeParser';
import { GraphqlArgumentsParser } from './graphql-arguments-parser/GraphqlArgumentsParser';
import { GraphqlFieldParser } from './graphql-field-parser/GraphqlFieldParser';
import { PreviousButton } from './previous-button/PreviousButton';
import { useSchemaStore } from 'store/useSchemaStore';

interface SchemaProps {
  schemaData: IntrospectionQuery;
}

type OtherTypes =
  | GraphQLScalarType<unknown, unknown>
  | GraphQLScalarType<unknown, unknown>
  | GraphQLInterfaceType
  | GraphQLUnionType
  | undefined;

const Schema: FC<SchemaProps> = ({ schemaData }) => {
  const schema = useMemo(() => buildClientSchema(schemaData), [schemaData]);

  const [currentType, previousType] = useSchemaStore((state) => [
    state.currentType,
    state.previousType,
  ]);

  const type = schema.getType(currentType);

  if (!type) {
    if (previousType === '') {
      const queryTypeFields = schema.getQueryType()?.getFields();
      if (queryTypeFields && currentType in queryTypeFields) {
        const field = queryTypeFields[currentType];

        return <QueryTypeFieldsSchema field={field} />;
      }
    } else {
      const objectType = schema.getType(previousType);

      if (objectType instanceof GraphQLObjectType) {
        const field = objectType.getFields()[currentType];

        return <ObjectTypeFieldSchema field={field} />;
      }
    }
  }

  if (type instanceof GraphQLObjectType || type instanceof GraphQLInputObjectType) {
    const fields = type.getFields();

    return <ObjectTypeSchema fields={fields} type={type} />;
  }

  if (type instanceof GraphQLEnumType) {
    return <EnumTypeSchema type={type} />;
  }

  return <OtherTypesSchema type={type} />;
};

const EnumTypeSchema: FC<{ type: GraphQLEnumType }> = ({ type }) => {
  return (
    <div className={styles.schema}>
      <div className={styles.schemaHeading}>
        <div className={styles.name}>{type.name}</div>
        <PreviousButton />
      </div>

      <div className={styles.field}>{type.description}</div>

      <div className={styles.title}>
        <ValuesIcon height={16} width={16} />
        <span>Values</span>
      </div>

      {type.getValues().map(({ name }) => (
        <div key={name} className={styles.field}>
          {name}
        </div>
      ))}
    </div>
  );
};

const OtherTypesSchema: FC<{ type: OtherTypes }> = ({ type }) => {
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
        />
      </div>
    </div>
  );
};

const ObjectTypeSchema: FC<{
  type: GraphQLObjectType | GraphQLInputObjectType;
  fields: GraphQLInputFieldMap | GraphQLFieldMap<unknown, unknown>;
}> = ({ fields, type }) => {
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
};

const QueryTypeFieldsSchema: FC<{ field: GraphQLField<unknown, unknown, unknown> }> = ({
  field,
}) => {
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
};

const ObjectTypeFieldSchema: FC<{ field: GraphQLField<unknown, unknown, unknown> }> = ({
  field,
}) => {
  return (
    <div className={styles.schema}>
      <div className={styles.schemaHeading}>
        <div className={styles.name}>{field.name}</div>
        <PreviousButton />
      </div>
      <div className={styles.title}>
        <TypeIcon height={16} width={16} />
        <span>Type</span>
      </div>
      <div className={styles.field}>
        <GraphqlTypeParser inputType={field.type} />
      </div>
    </div>
  );
};

export default Schema;
