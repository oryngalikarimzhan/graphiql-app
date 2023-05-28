import { FC } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import styles from './QueryResponseSection.module.scss';
import { GRAPHQL_API } from 'utils/constants/constants';
import { StatusMarker } from '../status-marker/StatusMarker';
import { CustomEditor } from 'components/common/custom-editor/CustomEditor';
import { usePlaygroundStore } from 'store/usePlaygroundStore';
import { LoaderSection } from 'components/common/section-loader/LoaderSection';

interface ResponseSectionProps {
  isLoading: boolean;
}

export const QueryResponseSection: FC<ResponseSectionProps> = ({ isLoading }) => {
  const responseEditorValue = usePlaygroundStore((state) => state.responseEditorValue);
  const { t } = useTranslation();

  return (
    <section className="playground-section">
      <section className={classnames('editor-box', styles.apiContainer)}>
        <h2 className={classnames('playground-section-title', styles.apiTitle)}>{GRAPHQL_API}</h2>
        <StatusMarker />
      </section>

      <section className={classnames('editor-box', styles.responseBox)}>
        <div className="playground-section-heading">
          <h3 className="playground-section-title">{t('studio.response')}</h3>
        </div>
        {isLoading && <LoaderSection />}
        <CustomEditor
          className={classnames({ [styles.editorHidden]: isLoading })}
          options={{ readOnly: true }}
          language="json"
          value={responseEditorValue}
        />
      </section>
    </section>
  );
};
