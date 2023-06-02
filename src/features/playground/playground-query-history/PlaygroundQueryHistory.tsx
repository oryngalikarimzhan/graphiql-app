import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';

import styles from './PlaygroundQueryHistory.module.scss';
import { SquareButton } from 'components/common/buttons/square-button/SquareButton';
import { useQueryHistoryStore } from 'store/useQueryHistoryStore';
import { ReactComponent as DeleteIcon } from 'assets/icons/delete-icon.svg';
import { usePlaygroundStore } from 'store/usePlaygroundStore';

export const PlaygroundQueryHistory: FC = () => {
  const { t } = useTranslation();
  const [queryHistory, deleteFromHistory] = useQueryHistoryStore((state) => [
    state.queryHistory,
    state.deleteFromHistory,
  ]);
  const setAllEditorsValue = usePlaygroundStore((state) => state.setAllEditorsValue);

  return (
    <section className={classnames('box-container', styles.historyBox)}>
      <div className="playground-section-heading">
        <h3 className="playground-section-title">{t('studio.history')}</h3>
      </div>
      <div className={styles.historyContainer}>
        {queryHistory.map(({ id, query, variables, headers, response }) => (
          <div key={id} className={styles.fieldWrapper}>
            <span
              className={styles.field}
              data-id={id}
              onClick={() => {
                setAllEditorsValue(query, variables, headers, response);
              }}
            >
              {query}
            </span>
            <SquareButton onClick={() => deleteFromHistory(id)}>
              <DeleteIcon height={20} />
            </SquareButton>
          </div>
        ))}
      </div>
    </section>
  );
};
