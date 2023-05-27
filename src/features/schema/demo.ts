// import {
//   DefinitionNode,
//   DocumentNode,
//   FieldDefinitionNode,
//   parse,
//   printSchema,
//   TypeNode,
// } from 'graphql';

// type Query = { name: string; query: string; returnType: string };

// function generateQueriesFromSchemaAST(schemaAST: DocumentNode) {
//   const queries: Query[] = [];

//   schemaAST.definitions.forEach((definition: DefinitionNode) => {
//     if (definition.kind === 'ObjectTypeDefinition' && definition.name.value === 'Query') {
//       definition.fields!.forEach((field) => visitFieldDefinition(field, queries));
//     }
//   });

//   return queries;
// }

// function visitFieldDefinition(field: FieldDefinitionNode, queries: Query[]) {
//   const fieldName = field.name.value; //OK
//   let queryArgs = '';
//   let fieldArgs = '';

//   field.arguments
//     ?.map((arg) => {
//       console.log();
//       queryArgs = `${arg.name.value}: ${getArgumentType(arg.type)}`;
//       fieldArgs = `${arg.name.value}: $${arg.name.value}`;
//     })
//     .join(', ') || '';

//   // const returnType = field.type.name?.value || '';
//   const queryName = `get${fieldName.charAt(0).toUpperCase()}${fieldName.slice(1)}`;

//   // Generate the query string
//   const query = `
//       query ${queryName}(${queryArgs}) {
//         ${fieldName}(${fieldArgs}) {

//         }
//       }
//     `;
//   //  ${getFieldSelections(field)}

//   queries.push({ name: queryName, query, returnType: '' });
// }

// const getArgumentType = (type: TypeNode) => {
//   if (type.kind === 'NamedType') return type.name.value;
//   // if (type.kind)
// };

// function getFieldSelections(field: FieldDefinitionNode) {
//   // if (field.selectionSet) {
//   //   return field.selectionSet.selections
//   //     .map((selection) => {
//   //       if (selection.kind === 'Field') {
//   //         return selection.name.value;
//   //       }
//   //       return null;
//   //     })
//   //     .filter(Boolean)
//   //     .join('\n');
//   // }
//   return '';
// }

// // const a = printSchema(schema);
// // const b = parse(a);
