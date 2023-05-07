import { editor } from 'monaco-editor/esm/vs/editor/editor.api';

export const customTheme: editor.IStandaloneThemeData = {
  base: 'hc-black',
  inherit: true,
  rules: [
    {
      foreground: '#000000',
      token: '',
    },
  ],
  colors: {
    'editor.background': '#202a3b',
    'editor.wordHighlightTextBackground': '#ffffff',
  },
};

export const customOptions: editor.IStandaloneEditorConstructionOptions = {
  scrollBeyondLastLine: false,
  automaticLayout: true,
  minimap: {
    enabled: false,
  },
  formatOnPaste: true,
  fontSize: 15,
  scrollbar: {
    verticalScrollbarSize: 0,
  },
  lineNumbersMinChars: 3,
  renderLineHighlight: 'none',
  wordWrap: 'on',
};
