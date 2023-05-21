import { FC, useEffect } from 'react';
import { Editor, useMonaco } from '@monaco-editor/react';
import classnames from 'classnames';

import styles from './CustomEditor.module.scss';
import { customTheme, customOptions } from './editorConfigs';
import { CopyButton } from '../buttons/copy-button/CopyButton';
import { ICustomEditorProps } from './types';
import { SpinnerLoader } from '../spinner-loader/SpinnerLoader';

export const CustomEditor: FC<ICustomEditorProps> = ({
  language,
  value,
  setValue,
  className,
  options,
}) => {
  const monaco = useMonaco();

  useEffect(() => {
    monaco?.editor.defineTheme('customTheme', customTheme);
    monaco?.editor.setTheme('customTheme');
    if (monaco) {
      console.log('here is the monaco instance:', monaco);
    }
  }, [monaco]);

  return (
    <div className={classnames(styles.editorContainer, className)}>
      <div className={styles.editorContent}>
        <Editor
          value={value}
          defaultLanguage={language}
          theme={'customTheme'}
          onChange={setValue}
          options={{ ...customOptions, ...options }}
          loading={<SpinnerLoader />}
        />
      </div>

      <div className={styles.controlPanel}>
        <div className={styles.languageTitle}>{language}</div>
        <CopyButton text={value} />
      </div>
    </div>
  );
};
