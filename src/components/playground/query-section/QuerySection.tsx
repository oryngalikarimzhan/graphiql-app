import { FC } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import styles from '../Playground.module.scss';
import { useActions, useAppSelector } from '../../../store/hooks';
import { CustomEditor } from '../../custom-editor/CustomEditor';
import { SquareButton } from '../../buttons/square-button/SquareButton';
import { ReactComponent as ArrowUpIcon } from '../../../assets/icons/arrow-up-icon.svg';
import { ReactComponent as ArrowDownIcon } from '../../../assets/icons/arrow-down-icon.svg';

export const QuerySection: FC = () => {
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
