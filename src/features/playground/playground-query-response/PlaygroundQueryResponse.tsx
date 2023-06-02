import { FC } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import styles from './PlaygroundQueryResponse.module.scss';
import { StatusMarker } from './status-marker/StatusMarker';
import { CustomEditor } from 'components/common/custom-editor/CustomEditor';
import { LoaderSection } from 'components/common/section-loader/LoaderSection';
import { usePlaygroundStore } from 'store/usePlaygroundStore';

interface QueryResponseProps {
  isLoading: boolean;
}

export const PlaygroundQueryResponse: FC<QueryResponseProps> = ({ isLoading }) => {
  const responseEditorValue = usePlaygroundStore((state) => state.responseEditorValue);
  const { t } = useTranslation();

  return (
    <section className={classnames('box-container', styles.responseBox)}>
      <div className={classnames('playground-section-heading', styles.responseHeading)}>
        <h3 className="playground-section-title">{t('studio.response')}</h3>
        <StatusMarker />
      </div>
      {isLoading && <LoaderSection />}
      <CustomEditor
        className={classnames({ [styles.editorHidden]: isLoading })}
        options={{ readOnly: true }}
        language="json"
        value={responseEditorValue}
      />
    </section>
  );
};
