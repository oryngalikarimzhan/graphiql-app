import { editor } from 'monaco-editor/esm/vs/editor/editor.api';

export const customTheme: editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    {
      foreground: '#000000',
      token: '',
    },
  ],
  colors: {
    'editor.background': '#808080',
  },
};
