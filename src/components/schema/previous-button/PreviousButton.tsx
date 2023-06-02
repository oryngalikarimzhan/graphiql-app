import { FC } from 'react';

import styles from './PreviousButton.module.scss';
import { SquareButton } from 'components/common/buttons/square-button/SquareButton';
import { ReactComponent as BackwardIcon } from 'assets/icons/backward-icon.svg';
import { useSchemaStore } from 'store/useSchemaStore';

export const PreviousButton: FC = () => {
  const [previousType, setPreviousGraphqlType] = useSchemaStore((state) => [
    state.previousType,
    state.setPreviousGraphqlType,
  ]);

  return previousType !== '' ? (
    <SquareButton className={styles.previousButton} onClick={() => setPreviousGraphqlType()}>
      <BackwardIcon /> {previousType}
    </SquareButton>
  ) : null;
};
