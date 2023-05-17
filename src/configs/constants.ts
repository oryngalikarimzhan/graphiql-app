import { RegularObject } from './../types/types';

const LOCALIZATION_COOKIE_KEY = 'i18next';

enum Language {
  RU = 'ru',
  EN = 'en',
}

const githubAuthors: RegularObject = {
  ihar: 'https://github.com/IharAnt',
  oryngali: 'https://github.com/oryngalikarimzhan',
  stepan: 'https://github.com/Stepan9092',
};

const GRAPHQL_API = 'https://rickandmortyapi.com/graphql';

export { Language, LOCALIZATION_COOKIE_KEY, GRAPHQL_API, githubAuthors };
