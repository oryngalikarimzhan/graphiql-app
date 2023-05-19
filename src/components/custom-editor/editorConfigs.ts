import { editor } from 'monaco-editor/esm/vs/editor/editor.api';

export const customTheme: editor.IStandaloneThemeData = {
  base: 'hc-black',
  inherit: true,
  rules: [],
  colors: {
    'editor.background': '#202a3b',
  },
};

export const customOptions: editor.IStandaloneEditorConstructionOptions = {
  scrollBeyondLastLine: false,
  automaticLayout: true,
  minimap: {
    enabled: false,
  },
  formatOnPaste: true,
  fontSize: 16,
  scrollbar: {
    verticalScrollbarSize: 0,
  },
  lineNumbersMinChars: 3,
  renderLineHighlight: 'none',
  wordWrap: 'on',
};