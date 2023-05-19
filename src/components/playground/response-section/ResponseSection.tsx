import { FC } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import styles from '../Playground.module.scss';
import { useActions, useAppSelector } from '../../../store/hooks';
import { GRAPHQL_API } from '../../../configs/constants';
import { StatusMarker } from '../../status-marker/StatusMarker';
import { CustomEditor } from '../../custom-editor/CustomEditor';

export const ResponseSection: FC = () => {
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
