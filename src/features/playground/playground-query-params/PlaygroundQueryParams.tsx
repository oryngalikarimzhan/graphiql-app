import { FC } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import styles from './PlaygroundQueryParams.module.scss';
import { usePlaygroundStore } from 'store/usePlaygroundStore';
import { CustomEditor } from 'components/common/custom-editor/CustomEditor';
import { SquareButton } from 'components/common/buttons/square-button/SquareButton';
import { ReactComponent as ArrowUpIcon } from 'assets/icons/arrow-up-icon.svg';
import { ReactComponent as ArrowDownIcon } from 'assets/icons/arrow-down-icon.svg';

export const PlaygroundQueryParams: FC = () => {
  const [
    isParamsBoxOpen,
    currentOnParamsBox,
    variablesEditorValue,
    headersEditorValue,
    changeCurrentOnParamsBox,
    toggleIsParamsBoxOpen,
    setVariablesEditorValue,
    setHeadersEditorValue,
  ] = usePlaygroundStore((state) => [
    state.isParamsBoxOpen,
    state.currentOnParamsBox,
    state.variablesEditorValue,
    state.headersEditorValue,
    state.changeCurrentOnParamsBox,
    state.toggleIsParamsBoxOpen,
    state.setVariablesEditorValue,
    state.setHeadersEditorValue,
  ]);

  const { t } = useTranslation();

  return (
    <section
      className={classnames('box-container', styles.paramsBox, {
        [styles.paramsBoxOpen]: isParamsBoxOpen,
      })}
    >
      <div className="playground-section-heading">
        <h3
          onClick={() => changeCurrentOnParamsBox('variables')}
          className={classnames('playground-section-title', styles.paramsTitle, {
            [styles.paramsActiveTitle]: currentOnParamsBox === 'variables',
          })}
        >
          {t('studio.query-var')}
        </h3>
        <h3
          onClick={() => changeCurrentOnParamsBox('headers')}
          className={classnames('playground-section-title', styles.paramsTitle, {
            [styles.paramsActiveTitle]: currentOnParamsBox === 'headers',
          })}
        >
          {t('studio.http-head')}
        </h3>
        <SquareButton className={styles.arrowButton} onClick={() => toggleIsParamsBoxOpen()}>
          {isParamsBoxOpen ? (
            <ArrowDownIcon height={9} width={14} />
          ) : (
            <ArrowUpIcon height={9} width={14} />
          )}
        </SquareButton>
      </div>
      <CustomEditor
        className={classnames({
          [styles.paramsHidden]: !isParamsBoxOpen || currentOnParamsBox !== 'variables',
        })}
        language="json"
        value={variablesEditorValue}
        setValue={(value) => setVariablesEditorValue(value || '')}
      />
      <CustomEditor
        className={classnames({
          [styles.paramsHidden]: !isParamsBoxOpen || currentOnParamsBox !== 'headers',
        })}
        language="json"
        value={headersEditorValue}
        setValue={(value) => setHeadersEditorValue(value || '')}
      />
    </section>
  );
};
