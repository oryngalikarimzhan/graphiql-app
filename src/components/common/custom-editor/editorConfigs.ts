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
  lineNumbers: 'on',
  scrollbar: {
    verticalScrollbarSize: 0,
  },
  lineNumbersMinChars: 3,
  folding: false,
  renderLineHighlight: 'none',
  wordWrap: 'on',
  // wrappingIndent: 'same',
  wrappingStrategy: 'advanced',
};

export const customMobileOptions: editor.IStandaloneEditorConstructionOptions = {
  lineNumbers: 'off',
  fontSize: 14,
};
