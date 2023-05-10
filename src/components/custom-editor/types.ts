import { editor } from 'monaco-editor';
import { OnChange } from '@monaco-editor/react';

export interface ICustomEditorProps {
  language: string;
  value: string;
  setValue: OnChange;
  className?: string;
  options?: editor.IStandaloneEditorConstructionOptions;
}
