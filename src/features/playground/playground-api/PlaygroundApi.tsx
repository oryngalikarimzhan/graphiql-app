import { FC, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import styles from './PlaygroundApi.module.scss';
import { SquareButton } from 'components/common/buttons/square-button/SquareButton';
import { ReactComponent as SwitchIcon } from 'assets/icons/switch-icon.svg';
import { usePlaygroundStore } from 'store/usePlaygroundStore';

export const PlaygroundApi: FC = () => {
  const { t } = useTranslation();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [apiEndpoint, setApiEndpoint] = usePlaygroundStore((state) => [
    state.apiEndpoint,
    state.setApiEndpoint,
  ]);
  const apiRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isDisabled) {
      apiRef.current?.focus();
    }
  }, [isDisabled]);

  return (
    <section className={classnames('box-container', styles.apiContainer)}>
      <div className={styles.apiBox}>
        <input
          type="text"
          id="api-url"
          className={classnames('playground-section-title', styles.apiInput)}
          defaultValue={apiEndpoint}
          ref={apiRef}
          disabled={isDisabled}
        />
        <SquareButton
          title={t('studio.api') || 'Change API'}
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
    </section>
  );
};
