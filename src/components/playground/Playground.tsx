import { FC, useState } from 'react';
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

const {
  playground,
  sideBar,
  schemaContainer,
  schemaContainerHidden,
  schemaTitle,
  schemaContent,
  editorTitle,
  editorTitleActive,
  editorBox,
  editorHeading,
  playgroundContainer,
  playgroundSection,
  queryContainer,
  queryBox,
  paramsBox,
  paramsHidden,
  arrowButton,
  executorButton,
  responseContainer,
  apiBox,
  apiContainer,
  apiTitle,
  responseBox,
} = styles;

export const Playground: FC = () => {
  const [queryEditorValue, setQueryEditorValue] = useState<string>('');
  const [variablesEditorValue, setVariablesEditorValue] = useState<string>('');
  const [headersEditorValue, setHeadersEditorValue] = useState<string>('');
  const [responseEditorValue, setResponseEditorValue] = useState<string>('');
  const [schemaIsOpen, setSchemaIsOpen] = useState(true);

  const [isParamsOpen, setIsParamsOpen] = useState(false);
  const [paramsEditor, setParamsEditor] = useState<'variables' | 'headers'>('variables');
  const { t } = useTranslation();

  const openParams = (paramName: 'variables' | 'headers') => {
    setParamsEditor(paramName);
    setIsParamsOpen(true);
  };

  const isActiveParam = (paramName: 'variables' | 'headers') =>
    isParamsOpen && paramsEditor === paramName;

  return (
    <div className={playground}>
      <div className={sideBar}>
        <SquareButton isActive={schemaIsOpen} onClick={() => setSchemaIsOpen((prev) => !prev)}>
          {schemaIsOpen ? (
            <FilledDocsIcon height={22} width={18} />
          ) : (
            <DocsIcon height={22} width={18} />
          )}
        </SquareButton>
        <SquareButton
          className={executorButton}
          onClick={() => setResponseEditorValue(queryEditorValue)}
        >
          <ExecutorIcon />
        </SquareButton>
      </div>

      <article className={playgroundContainer}>
        <div
          className={classnames(playgroundSection, schemaContainer, {
            [schemaContainerHidden]: !schemaIsOpen,
          })}
        >
          <h2 className={schemaTitle}>{t('schema')}</h2>
          <div className={schemaContent}>SCHEME CONTENT HERE</div>
        </div>

        <section className={classnames(playgroundSection, queryContainer)}>
          <div className={classnames(editorBox, queryBox)}>
            <div className={editorHeading}>
              <h3 className={classnames(editorTitle, editorTitleActive)}>{t('query')}</h3>
            </div>
            <CustomEditor
              language="graphql"
              value={queryEditorValue}
              setValue={(value) => setQueryEditorValue(value || '')}
            />
          </div>

          <div className={classnames(editorBox, paramsBox)}>
            <div className={editorHeading}>
              <h3
                onClick={() => openParams('variables')}
                className={classnames(editorTitle, {
                  [editorTitleActive]: isActiveParam('variables'),
                })}
              >
                {t('q-var')}
              </h3>
              <h3
                onClick={() => openParams('headers')}
                className={classnames(editorTitle, {
                  [editorTitleActive]: isActiveParam('headers'),
                })}
              >
                {t('http-head')}
              </h3>
              <SquareButton
                className={arrowButton}
                onClick={() => setIsParamsOpen((prev) => !prev)}
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
                [paramsHidden]: !isActiveParam('variables'),
              })}
              language="json"
              value={variablesEditorValue}
              setValue={(value) => setVariablesEditorValue(value || '')}
            />
            <CustomEditor
              className={classnames({
                [paramsHidden]: !isActiveParam('headers'),
              })}
              language="json"
              value={headersEditorValue}
              setValue={(value) => setHeadersEditorValue(value || '')}
            />
          </div>
        </section>

        <section className={classnames(playgroundSection, responseContainer)}>
          <div className={classnames(apiBox, apiContainer)}>
            <h2 className={apiTitle}>API_URL_HERE</h2>
            <StatusMarker isOk={false} statusCode={500} />
          </div>

          <div className={classnames(editorBox, responseBox)}>
            <div className={editorHeading}>
              <h3 className={classnames(editorTitle, editorTitleActive)}>{t('response')}</h3>
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
