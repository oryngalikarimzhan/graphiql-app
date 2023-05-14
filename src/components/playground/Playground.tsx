import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';

import styles from './Playground.module.scss';
import { CustomEditor } from '../custom-editor/CustomEditor';
import { SquareButton } from '../buttons/square-button/SquareButton';
import { ReactComponent as DocsIcon } from '../../assets/icons/docs-icon.svg';
import { ReactComponent as ExecutorIcon } from '../../assets/icons/executor-icon.svg';
import { ReactComponent as FilledDocsIcon } from '../../assets/icons/filled-docs-icon.svg';
import { ReactComponent as ArrowUpIcon } from '../../assets/icons/arrow-up-icon.svg';
import { ReactComponent as ArrowDownIcon } from '../../assets/icons/arrow-down-icon.svg';
import { StatusMarker } from '../status-marker/StatusMarker';
import { useAppSelector } from '../../store/hooks';
import { useActions } from '../../store/hooks';

export const Playground: FC = () => {
  const queryEditorValue = useAppSelector((state) => state.playground.queryEditorValue);
  const variablesEditorValue = useAppSelector((state) => state.playground.variablesEditorValue);
  const headersEditorValue = useAppSelector((state) => state.playground.headersEditorValue);
  const schemaIsOpen = useAppSelector((state) => state.playground.schemaIsOpen);
  const isParamsOpen = useAppSelector((state) => state.playground.isParamsIsOpen);
  const responseEditorValue = useAppSelector((state) => state.playground.responseEditorValue);
  const paramsEditor = useAppSelector((state) => state.playground.paramsEditor);

  const {
    setHeadersEditorValue,
    setParamsEditor,
    setParamsIsOpen,
    setQueryEditorValue,
    setResponseEditorValue,
    setSchemaIsOpen,
    setVariablesEditorValue,
  } = useActions();

  const { t } = useTranslation();

  const openParams = (paramName: 'variables' | 'headers') => {
    setParamsEditor(paramName);
    setParamsIsOpen(true);
  };

  const isActiveParam = (paramName: 'variables' | 'headers') =>
    isParamsOpen && paramsEditor === paramName;

  return (
    <div className={styles.playground}>
      <div className={styles.sideBar}>
        <SquareButton isActive={schemaIsOpen} onClick={() => setSchemaIsOpen(!schemaIsOpen)}>
          {schemaIsOpen ? (
            <FilledDocsIcon height={22} width={18} />
          ) : (
            <DocsIcon height={22} width={18} />
          )}
        </SquareButton>
        <SquareButton
          className={styles.executorButton}
          onClick={() => setResponseEditorValue(queryEditorValue)}
        >
          <ExecutorIcon />
        </SquareButton>
      </div>

      <article className={styles.playgroundContainer}>
        <div
          className={classnames(styles.playgroundSection, styles.schemaContainer, {
            [styles.schemaContainerHidden]: !schemaIsOpen,
          })}
        >
          <h2 className={styles.schemaTitle}>{t('schema')}</h2>
          <div className={styles.schemaContent}>SCHEME CONTENT HERE</div>
        </div>

        <section className={classnames(styles.playgroundSection, styles.queryContainer)}>
          <div className={classnames(styles.editorBox, styles.queryBox)}>
            <div className={styles.editorHeading}>
              <h3 className={classnames(styles.editorTitle, styles.editorTitleActive)}>
                {t('query')}
              </h3>
            </div>
            <CustomEditor
              language="graphql"
              value={queryEditorValue}
              setValue={(value) => setQueryEditorValue(value || '')}
            />
          </div>

          <div className={classnames(styles.editorBox, styles.paramsBox)}>
            <div className={styles.editorHeading}>
              <h3
                onClick={() => openParams('variables')}
                className={classnames(styles.editorTitle, {
                  [styles.editorTitleActive]: isActiveParam('variables'),
                })}
              >
                {t('q-var')}
              </h3>
              <h3
                onClick={() => openParams('headers')}
                className={classnames(styles.editorTitle, {
                  [styles.editorTitleActive]: isActiveParam('headers'),
                })}
              >
                {t('http-head')}
              </h3>
              <SquareButton
                className={styles.arrowButton}
                onClick={() => setParamsIsOpen(!isParamsOpen)}
              >
                {isParamsOpen ? (
                  <ArrowUpIcon height={9} width={14} />
                ) : (
                  <ArrowDownIcon height={9} width={14} />
                )}
              </SquareButton>
            </div>
            <CustomEditor
              className={classnames({
                [styles.paramsHidden]: !isActiveParam('variables'),
              })}
              language="json"
              value={variablesEditorValue}
              setValue={(value) => setVariablesEditorValue(value || '')}
            />
            <CustomEditor
              className={classnames({
                [styles.paramsHidden]: !isActiveParam('headers'),
              })}
              language="json"
              value={headersEditorValue}
              setValue={(value) => setHeadersEditorValue(value || '')}
            />
          </div>
        </section>

        <section className={classnames(styles.playgroundSection, styles.responseContainer)}>
          <div className={classnames(styles.apiBox, styles.apiContainer)}>
            <h2 className={styles.apiTitle}>API_URL_HERE</h2>
            <StatusMarker isOk={false} statusCode={500} />
          </div>

          <div className={classnames(styles.editorBox, styles.responseBox)}>
            <div className={styles.editorHeading}>
              <h3 className={classnames(styles.editorTitle, styles.editorTitleActive)}>
                {t('response')}
              </h3>
            </div>
            <CustomEditor
              options={{ readOnly: true }}
              language="json"
              value={responseEditorValue}
              setValue={(value) => setResponseEditorValue(value || '')}
            />
          </div>
        </section>
      </article>
    </div>
  );
};
