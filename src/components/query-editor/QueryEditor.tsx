import { FC, MutableRefObject } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { type editor } from 'monaco-editor';
import HashLoader from 'react-spinners/HashLoader';
import classnames from 'classnames';

import { customTheme } from './customTheme';
import styles from './QueryEditor.module.scss';

interface IQueryEditorProps {
  editorRef: MutableRefObject<editor.IStandaloneCodeEditor | null>;
  className?: string;
}

export const QueryEditor: FC<IQueryEditorProps> = ({ editorRef, className }) => {
  const onMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monaco.editor.defineTheme('customTheme', customTheme);
    monaco.editor.setTheme('customTheme');
  };

  return (
    <>
      <div className={classnames(styles.QueryEditor, className)}>
        <Editor
          defaultLanguage="graphql"
          onMount={onMount}
          options={{
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
