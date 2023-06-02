import { FC } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import styles from './PlaygroundQuery.module.scss';
import { CustomEditor } from 'components/common/custom-editor/CustomEditor';
import { usePlaygroundStore } from 'store/usePlaygroundStore';

export const PlaygroundQuery: FC = () => {
  const [queryEditorValue, setQueryEditorValue] = usePlaygroundStore((state) => [
    state.queryEditorValue,
    state.setQueryEditorValue,
  ]);
  const { t } = useTranslation();

  return (
    <section className={classnames('box-container', styles.queryBox)}>
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
