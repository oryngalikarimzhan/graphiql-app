import { FC } from 'react';
import HashLoader from 'react-spinners/HashLoader';
import { Editor } from '@monaco-editor/react';
import classnames from 'classnames';

import styles from './CustomEditor.module.scss';
import { customTheme, customOptions } from './editorConfigs';
import { CopyButton } from '../buttons/copy-button/CopyButton';
import { ICustomEditorProps } from './types';

const { editorContainer, editorContent, controlPanel, languageTitle } = styles;

export const CustomEditor: FC<ICustomEditorProps> = ({
  language,
  value,
  setValue,
  className,
  options,
}) => {
  return (
    <div className={classnames(editorContainer, className)}>
      <div className={editorContent}>
        <Editor
          value={value}
          defaultLanguage={language}
          onMount={(_, monaco) => {
            monaco.editor.defineTheme('customTheme', customTheme);
            monaco.editor.setTheme('customTheme');
          }}
          onChange={setValue}
          options={{ ...customOptions, ...options }}
          loading={<HashLoader color="#a836d6" />}
        />
      </div>

      <div className={controlPanel}>
        <div className={languageTitle}>{language}</div>
        <CopyButton text={value} />
      </div>
    </div>
  );
};
