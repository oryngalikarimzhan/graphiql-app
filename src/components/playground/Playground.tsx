import { FC, useState } from 'react';
import { Editor } from '@monaco-editor/react';
import { useTranslation } from 'react-i18next';
import HashLoader from 'react-spinners/HashLoader';
import classnames from 'classnames';
import { editor } from 'monaco-editor';
import ReactResizeDetector from 'react-resize-detector';

import styles from './Playground.module.scss';
import { customTheme, customOptions } from './editorConfigs';
import { EditorControl } from '../editor-control/EditorControl';
import { Button } from '../button/Button';
import { ButtonCopy } from '../button-copy/ButtonCopy';
import { ReactComponent as DocsIcon } from '../../assets/icons/docs-icon.svg';
import { ReactComponent as ExecutorIcon } from '../../assets/icons/executor-icon.svg';
import { ReactComponent as FilledDocsIcon } from '../../assets/icons/filled-docs-icon.svg';

const {
  playground,
  sideBar,
  schemaButton,
  schemaButtonActive,
  schemaContent,
  schemaContentHidden,
  schemaTitle,
  editorContainer,
  queryContainer,
  queryBox,
  queryVariablesBox,
  executorButton,
  responseContainer,
  apiUrl,
  responseBox,
} = styles;

export const Playground: FC = () => {
  const [queryEditorValue, setQueryEditorValue] = useState<string>('');
  const [queryVariablesEditorValue, setQueryVariablesEditorValue] = useState<string>('');
  const [responseEditorValue, setResponseEditorValue] = useState<string>('');
  const [schemaIsOpen, setSchemaIsOpen] = useState(false);

  const [queryEditor, setQueryEditor] = useState<editor.IStandaloneCodeEditor>();
  const [queryVariablesEditor, setQueryVariablesEditor] = useState<editor.IStandaloneCodeEditor>();
  const [responseEditor, setResponseEditor] = useState<editor.IStandaloneCodeEditor>();
  const { t } = useTranslation();

  return (
    <div className={playground}>
      <div className={sideBar}>
        <Button
          className={classnames(schemaButton, { [schemaButtonActive]: schemaIsOpen })}
          onClick={() => setSchemaIsOpen((prev) => !prev)}
        >
          {schemaIsOpen ? (
            <FilledDocsIcon height={22} width={18} />
          ) : (
            <DocsIcon height={22} width={18} />
          )}
        </Button>
      </div>

      <div className={editorContainer}>
        <div
          className={classnames(schemaContent, {
            [schemaContentHidden]: !schemaIsOpen,
          })}
        >
          <h2 className={schemaTitle}>{t('schema')}</h2>
        </div>
        <div className={queryContainer}>
          {/* <EditorControl
            className={queryBox}
            title={t('query')}
            // editor={queryEditor}
            buttons={
              <>
                <Button
                  onClick={() => setResponseEditorValue(queryEditorValue)}
                  className={executorButton}
                >
                  <ExecutorIcon />
                </Button>
                <ButtonCopy text={queryEditorValue} />
              </>
            }
          >
            <ReactResizeDetector
              handleWidth
              handleHeight
              onResize={() => {
                if (queryEditor) {
                  queryEditor.layout();
                }
              }}
            >
              {({ width, height }) => (
                <Editor
                  width={width}
                  height={height}
                  defaultLanguage="graphql"
                  onMount={(editor, monaco) => {
                    monaco.editor.defineTheme('customTheme', customTheme);
                    monaco.editor.setTheme('customTheme');
                    setQueryEditor(editor);
                  }}
                  onChange={(value) => setQueryEditorValue(value || '')}
                  options={customOptions}
                  loading={<HashLoader color="#a836d6" />}
                />
              )}
            </ReactResizeDetector>
          </EditorControl> */}

          <Editor
            defaultLanguage="graphql"
            onMount={(editor, monaco) => {
              monaco.editor.defineTheme('customTheme', customTheme);
              monaco.editor.setTheme('customTheme');
              // editor.onDidContentSizeChange(() => {
              //   setHeight(Math.min(1000, editor.getContentHeight()));
              //   editor.layout();
              // });
            }}
            onChange={(value) => setQueryEditorValue(value || '')}
            options={customOptions}
            loading={<HashLoader color="#a836d6" />}
          />
          {/* <EditorControl
            className={queryVariablesBox}
            // editor={queryVariablesEditor}
            buttons={<ButtonCopy text={queryVariablesEditorValue} />}
          >
            <ReactResizeDetector
              handleWidth
              handleHeight
              onResize={() => {
                if (queryVariablesEditor) {
                  queryVariablesEditor.layout();
                }
              }}
            >
              {({ width, height }) => (
                <Editor
                  width={width}
                  height={height}
                  onMount={(editor) => {
                    setQueryVariablesEditor(editor);
                  }}
                  defaultLanguage="json"
                  onChange={(value) => setQueryVariablesEditorValue(value || '')}
                  options={customOptions}
                  loading={<HashLoader color="#a836d6" />}
                />
              )}
            </ReactResizeDetector>
          </EditorControl> */}
        </div>

        <div className={responseContainer}>
          <div className={apiUrl}>API_URL_HERE</div>

          {/* <EditorControl
            className={responseBox}
            title={t('result')}
            // editor={responseEditor}
            buttons={<ButtonCopy text={responseEditorValue} />}
          >
            <ReactResizeDetector
              handleWidth
              handleHeight
              onResize={() => {
                if (responseEditor) {
                  responseEditor.layout();
                }
              }}
            >
              {({ width, height }) => (
                <Editor
                  width={width}
                  height={height}
                  onMount={(editor) => {
                    setResponseEditor(editor);
                  }}
                  defaultLanguage="json"
                  value={responseEditorValue}
                  onChange={(value) => setResponseEditorValue(value || '')}
                  options={{ ...customOptions, readOnly: true }}
                  loading={<HashLoader color="#a836d6" />}
                />
              )}
            </ReactResizeDetector>
          </EditorControl> */}
        </div>
      </div>
    </div>
  );
};
