import { FC, useEffect, useState } from 'react';
import { Editor, useMonaco } from '@monaco-editor/react';
import classnames from 'classnames';
import { editor } from 'monaco-editor';
import { OnChange } from '@monaco-editor/react';

import styles from './CustomEditor.module.scss';
import { customTheme, customOptions } from './editorConfigs';
import { CopyButton } from '../buttons/copy-button/CopyButton';
import { SpinnerLoader } from '../spinner-loader/SpinnerLoader';

interface CustomEditorProps {
  language: string;
  value: string;
  setValue?: OnChange;
  className?: string;
  options?: editor.IStandaloneEditorConstructionOptions;
}

export const CustomEditor: FC<CustomEditorProps> = ({
  language,
  value,
  setValue,
  className,
  options,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const monaco = useMonaco();

  useEffect(() => {
    const query = matchMedia('(max-width: 767px)');

    if (query.matches) setIsMobile(true);

    const changeOption = (event: MediaQueryListEvent) => {
      if (event.matches) setIsMobile(true);
      else setIsMobile(false);
    };

    query.addEventListener('change', changeOption);

    return () => {
      query.removeEventListener('change', changeOption);
    };
  }, []);

  useEffect(() => {
    monaco?.editor.defineTheme('customTheme', customTheme);
    monaco?.editor.setTheme('customTheme');
  }, [monaco]);

  return (
    <div className={classnames(styles.editorContainer, className)}>
      <div className={styles.editorContent}>
        <Editor
          value={value}
          defaultLanguage={language}
          theme={'customTheme'}
          onChange={setValue}
          options={
            isMobile
              ? { ...customOptions, lineNumbers: 'off', ...options }
              : { ...customOptions, lineNumbers: 'on', ...options }
          }
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
