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
import { useAppSelector, useActions } from '../../store/hooks';
import { Schema } from '../schema/Schema';
import { GRAPHQL_API } from '../../config/constants';

export const Playground: FC = () => {
  return (
    <div className={styles.playground}>
      <SideBar />

      <article className={styles.playgroundContainer}>
        <SchemaSection />
        <QueryEditorSection />
        <ResponseSection />
      </article>
    </div>
  );
};

const SideBar: FC = () => {
  const { queryEditorValue, schemaIsOpen } = useAppSelector((state) => state.playground);
  const { setSchemaIsOpen, setResponseEditorValue } = useActions();
  return (
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
  );
};

const SchemaSection: FC = () => {
  const { schemaIsOpen } = useAppSelector((state) => state.playground);
  const { t } = useTranslation();
  return (
    <div
      className={classnames(styles.playgroundSection, styles.schemaContainer, {
        [styles.schemaContainerHidden]: !schemaIsOpen,
      })}
    >
      <div className={styles.schemaHeading}>
        <h3 className={styles.schemaTitle}>{t('schema')}</h3>
      </div>

      <Schema />
    </div>
  );
};

const QueryEditorSection: FC = () => {
  const { queryEditorValue, variablesEditorValue, headersEditorValue, paramsEditor, isParamsOpen } =
    useAppSelector((state) => state.playground);

  const {
    setHeadersEditorValue,
    setIsParamsOpen,
    setQueryEditorValue,
    setParamsEditor,
    setVariablesEditorValue,
  } = useActions();

  const { t } = useTranslation();

  const openParams = (paramName: 'variables' | 'headers') => {
    setParamsEditor(paramName);
    setIsParamsOpen(true);
  };

  const isActiveParam = (paramName: 'variables' | 'headers') =>
    isParamsOpen && paramsEditor === paramName;

  return (
    <section className={classnames(styles.playgroundSection, styles.queryContainer)}>
      <div className={classnames(styles.editorBox, styles.queryBox)}>
        <div className={styles.editorHeading}>
          <h3 className={classnames(styles.editorTitle, styles.editorTitleActive)}>{t('query')}</h3>
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
            onClick={() => setIsParamsOpen(!isParamsOpen)}
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
  );
};

const ResponseSection: FC = () => {
  const { responseEditorValue } = useAppSelector((state) => state.playground);

  const { setResponseEditorValue } = useActions();

  const { t } = useTranslation();

  return (
    <section className={classnames(styles.playgroundSection, styles.responseContainer)}>
      <div className={classnames(styles.apiBox, styles.apiContainer)}>
        <h2 className={styles.apiTitle}>{GRAPHQL_API}</h2>
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
  );
};
