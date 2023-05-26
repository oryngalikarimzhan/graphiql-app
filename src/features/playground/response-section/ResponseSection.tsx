import { FC } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import styles from '../Playground.module.scss';
import { GRAPHQL_API } from 'utils/constants/constants';
import { StatusMarker } from '../status-marker/StatusMarker';
import { CustomEditor } from 'components/common/custom-editor/CustomEditor';
import { SectionLoading } from '../section-loading/SectionLoading';
import { usePlaygroundStore } from 'store/playground/usePlaygroundStore';

interface ResponseSectionProps {
  isFetching: boolean;
}

export const ResponseSection: FC<ResponseSectionProps> = ({ isFetching }) => {
  const responseEditorValue = usePlaygroundStore((state) => state.responseEditorValue);
  const { t } = useTranslation();

  return (
    <section className={classnames(styles.playgroundSection, styles.responseContainer)}>
      <div className={classnames(styles.apiBox, styles.apiContainer)}>
        <h2 className={styles.apiTitle}>{GRAPHQL_API}</h2>
        <StatusMarker />
      </div>

      <div className={classnames(styles.editorBox, styles.responseBox)}>
        <div className={styles.editorHeading}>
          <h3 className={classnames(styles.editorTitle, styles.editorTitleActive)}>
            {t('studio.response')}
          </h3>
        </div>
        {isFetching && <SectionLoading />}
        <CustomEditor options={{ readOnly: true }} language="json" value={responseEditorValue} />
      </div>
    </section>
  );
};
