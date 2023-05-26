import { FC } from 'react';

import styles from './PreviousButton.module.scss';
import { useActions, useAppSelector } from 'store/hooks';
import { SquareButton } from 'components/common/buttons/square-button/SquareButton';
import { ReactComponent as BackwardIcon } from 'assets/icons/backward-icon.svg';

export const PreviousButton: FC = () => {
  const { previousType } = useAppSelector((state) => state.schema);
  const { getPreviousGraphqlType } = useActions();

  return previousType !== '' ? (
    <SquareButton className={styles.previousButton} onClick={() => getPreviousGraphqlType()}>
      <BackwardIcon /> {previousType}
    </SquareButton>
  ) : null;
};
