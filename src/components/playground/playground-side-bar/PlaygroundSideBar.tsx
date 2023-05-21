import { FC } from 'react';

import styles from '../Playground.module.scss';
import { useAppSelector } from '../../../store/hooks';
import { SquareButton } from '../../buttons/square-button/SquareButton';
import { ReactComponent as DocsIcon } from '../../../assets/icons/docs-icon.svg';
import { ReactComponent as ExecutorIcon } from '../../../assets/icons/executor-icon.svg';
import { ReactComponent as FilledDocsIcon } from '../../../assets/icons/filled-docs-icon.svg';
import { PlaygroundSideBarProps } from './types';

export const PlaygroundSideBar: FC<PlaygroundSideBarProps> = ({
  graphqlSchemaHandler,
  graphqlApiHandler,
}) => {
  const { schemaIsOpen } = useAppSelector((state) => state.playground);

  return (
    <aside className={styles.sideBar}>
      <SquareButton isActive={schemaIsOpen} onClick={graphqlSchemaHandler}>
        {schemaIsOpen ? (
          <FilledDocsIcon height={22} width={18} />
        ) : (
          <DocsIcon height={22} width={18} />
        )}
      </SquareButton>
      <SquareButton className={styles.executorButton} onClick={graphqlApiHandler}>
        <ExecutorIcon />
      </SquareButton>
    </aside>
  );
};
