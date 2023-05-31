import { FC } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { shallow } from 'zustand/shallow';

import styles from './QueryRequestSection.module.scss';
import { CustomEditor } from 'components/common/custom-editor/CustomEditor';
import { SquareButton } from 'components/common/buttons/square-button/SquareButton';
import { ReactComponent as ArrowUpIcon } from 'assets/icons/arrow-up-icon.svg';
import { ReactComponent as ArrowDownIcon } from 'assets/icons/arrow-down-icon.svg';
import { usePlaygroundStore } from 'features/playground/usePlaygroundStore';

export const QueryRequestSection: FC = () => {
  return (
    <section className="playground-section">
      <QuerySection />
      <ParamsSection />
    </section>
  );
};

const QuerySection: FC = () => {
  const [queryEditorValue, setQueryEditorValue] = usePlaygroundStore((state) => {
    return [state.queryEditorValue, state.setQueryEditorValue];
  });

  const { t } = useTranslation();
  return (
    <section className={classnames('editor-box', styles.queryBox)}>
      <div className="playground-section-heading">
        <h3 className="playground-section-title">{t('studio.query')}</h3>
      </div>
      <CustomEditor
        language="graphql"
        value={queryEditorValue}
        setValue={(value) => setQueryEditorValue(value || '')}
      />
    </section>
  );
};

const ParamsSection: FC = () => {
  const [
    isParamsBoxOpen,
    setIsParamsBoxOpen,
    paramsBoxEditor,
    changeParamsBoxEditor,
    variablesEditorValue,
    setVariablesEditorValue,
    headersEditorValue,
    setHeadersEditorValue,
  ] = usePlaygroundStore(
    (state) => [
      state.isParamsBoxOpen,
      state.setIsParamsBoxOpen,
      state.paramsBoxEditor,
      state.changeParamsBoxEditor,
      state.variablesEditorValue,
      state.setVariablesEditorValue,
      state.headersEditorValue,
      state.setHeadersEditorValue,
    ],
    shallow
  );

  const { t } = useTranslation();

  const showEditor = (paramName: 'variables' | 'headers') => {
    changeParamsBoxEditor(paramName);
    setIsParamsBoxOpen(true);
  };

  const isActiveEditor = (paramName: 'variables' | 'headers') =>
    isParamsBoxOpen && paramsBoxEditor === paramName;

  return (
    <section
      className={classnames('editor-box', styles.paramsBox, {
        [styles.paramsBoxOpen]: isParamsBoxOpen,
      })}
    >
      <div className="playground-section-heading">
        <h3
          onClick={() => showEditor('variables')}
          className={classnames('playground-section-title', styles.paramsTitle, {
            [styles.paramsActiveTitle]: isActiveEditor('variables'),
          })}
        >
          {t('studio.query-var')}
        </h3>
        <h3
          onClick={() => showEditor('headers')}
          className={classnames('playground-section-title', styles.paramsTitle, {
            [styles.paramsActiveTitle]: isActiveEditor('headers'),
          })}
        >
          {t('studio.http-head')}
        </h3>
        <SquareButton
          className={styles.arrowButton}
          onClick={() => setIsParamsBoxOpen(!isParamsBoxOpen)}
        >
          {isParamsBoxOpen ? (
            <ArrowDownIcon height={9} width={14} />
          ) : (
            <ArrowUpIcon height={9} width={14} />
          )}
        </SquareButton>
      </div>
      <CustomEditor
        className={classnames({
          [styles.paramsHidden]: !isActiveEditor('variables'),
        })}
        language="json"
        value={variablesEditorValue}
        setValue={(value) => setVariablesEditorValue(value || '')}
      />
      <CustomEditor
        className={classnames({
          [styles.paramsHidden]: !isActiveEditor('headers'),
        })}
        language="json"
        value={headersEditorValue}
        setValue={(value) => setHeadersEditorValue(value || '')}
      />
    </section>
  );
};
