import { FC, useRef, useState } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { shallow } from 'zustand/shallow';

import styles from './QueryResponseSection.module.scss';
import { StatusMarker } from '../status-marker/StatusMarker';
import { CustomEditor } from 'components/common/custom-editor/CustomEditor';
import { usePlaygroundStore } from 'features/playground/usePlaygroundStore';
import { LoaderSection } from 'components/common/section-loader/LoaderSection';
import { SquareButton } from 'components/common/buttons/square-button/SquareButton';
import { ReactComponent as SwitchIcon } from 'assets/icons/switch-icon.svg';

interface ResponseSectionProps {
  isLoading: boolean;
}

export const QueryResponseSection: FC<ResponseSectionProps> = ({ isLoading }) => {
  const responseEditorValue = usePlaygroundStore((state) => state.responseEditorValue);
  const { t } = useTranslation();

  return (
    <section className="playground-section">
      <ApiSection />

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

const ApiSection = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [apiEndpoint, setApiEndpoint] = usePlaygroundStore(
    (state) => [state.apiEndpoint, state.setApiEndpoint],
    shallow
  );
  const apiRef = useRef<HTMLInputElement>(null);

  return (
    <section className={classnames('editor-box', styles.apiContainer)}>
      <div className={styles.apiBox}>
        <input
          type="text"
          className={classnames('playground-section-title', styles.apiInput)}
          defaultValue={apiEndpoint}
          ref={apiRef}
          disabled={isDisabled}
        />
        <SquareButton
          onClick={() => {
            if (!isDisabled) {
              setApiEndpoint(apiRef.current?.value || '');
            }
            setIsDisabled((isDisabled) => !isDisabled);
          }}
          className={classnames({ [styles.apiButtonActive]: !isDisabled })}
        >
          <SwitchIcon height={20} />
        </SquareButton>
      </div>
      <StatusMarker />
    </section>
  );
};
