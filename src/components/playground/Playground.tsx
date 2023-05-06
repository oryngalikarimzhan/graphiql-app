import { FC, useRef } from 'react';
import { type editor } from 'monaco-editor';

import { QueryEditor } from '../query-editor/QueryEditor';
import { QueryResult } from '../query-result/QueryResult';
import styles from './Playground.module.scss';
import { Button } from '../button/Button';
import { ReactComponent as DocsIcon } from '../../assets/icons/docs-icon.svg';
import { useTranslation } from 'react-i18next';
// import { ReactComponent as FilledDocsIcon } from '../../assets/icons/filled-docs-icon.svg';

export const Playground: FC = () => {
  const queryEditorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const resultBoxRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const { t } = useTranslation();

  function showValue() {
    resultBoxRef.current?.setValue(queryEditorRef.current!.getValue());
  }

  return (
    <div className={styles.playground}>
      <div className={styles.schema}>
        <div className={styles.schemaPanel}>
          <Button className={styles.schemaButton}>
            <DocsIcon height={24} width={20} />
            {/* <FilledDocsIcon height={24} width={20} /> */}
          </Button>
        </div>
        <div className={styles.schemaContent}>
          <h2 className={styles.schemaTitle}>{t('schema')}</h2>
        </div>
      </div>
      <div className={styles.editor}>
        <div className={styles.queryBox}>
          <div className={styles.queryEditor}>
            <QueryEditor editorRef={queryEditorRef} />
          </div>
          <div>
            <button onClick={showValue}>Execute query</button>
            <button>Copy query</button>
          </div>
        </div>
        <div className={styles.resultBox}>
          <div>
            <QueryResult editorRef={resultBoxRef} />
          </div>
          <div>
            <button>Copy result</button>
          </div>
        </div>
      </div>
    </div>
  );
};
