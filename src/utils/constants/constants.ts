import { RegularObject } from 'utils/types/types';

const githubAuthor: RegularObject = {
  oryngalikarimzhan: 'https://github.com/oryngalikarimzhan',
};

const GRAPHQL_DEFAULT_API = {
  // api: 'https://countries.trevorblades.com/';
  // api:'https://graphqlpokemon.favware.tech/v7';
  api: 'https://rickandmortyapi.com/graphql',
  query: `query ($id: ID!) { \n\tcharacter(id: $id) { \n\t\tid \n\t\tname \n\t\tstatus \n\t\tspecies \n\t\ttype \n\t\tgender \n\t\torigin { \n\t\t\tid \n\t\t\tname \n\t\t} \n\t\tlocation { \n\t\t\tid \n\t\t\tname \n\t\t} \n\t\timage \n\t\tepisode { \n\t\t\tid \n\t\t\tname \n\t\t\tcreated \n\t\t} \n\t\tcreated \n\t\t} \n}`,
  variables: `{ \n\t"id": 1 \n}`,
};

enum Languages {
  RU = 'ru',
  EN = 'en',
}

const LOCALIZATION_COOKIE_KEY = 'i18next';

export { githubAuthor, GRAPHQL_DEFAULT_API, Languages, LOCALIZATION_COOKIE_KEY };
