import { FC, MutableRefObject } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { type editor } from 'monaco-editor';
import { customTheme } from '../query-editor/customTheme';
import HashLoader from 'react-spinners/HashLoader';
import classnames from 'classnames';

import styles from './QueryResult.module.scss';

interface IQueryResultProps {
  editorRef: MutableRefObject<editor.IStandaloneCodeEditor | null>;
  className?: string;
}

export const QueryResult: FC<IQueryResultProps> = ({ editorRef, className }) => {
  const onMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monaco.editor.defineTheme('customTheme', customTheme);
    monaco.editor.setTheme('customTheme');
  };

  return (
    <>
      <div className={classnames(styles.queryBox, className)}>
        <Editor
          defaultLanguage="json"
          onMount={onMount}
          options={{
            readOnly: true,
            minimap: {
              enabled: false,
            },
            formatOnPaste: true,
            fontSize: 15,
          }}
          loading={<HashLoader color="#a836d6" />}
        />
      </div>
    </>
  );
};
