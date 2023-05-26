import { FC } from 'react';

import styles from '../Playground.module.scss';
import { SquareButton } from 'components/common/buttons/square-button/SquareButton';
import { ReactComponent as DocsIcon } from 'assets/icons/docs-icon.svg';
import { ReactComponent as ExecutorIcon } from 'assets/icons/executor-icon.svg';
import { ReactComponent as FilledDocsIcon } from 'assets/icons/filled-docs-icon.svg';
import { usePlaygroundStore } from 'store/playground/usePlaygroundStore';

interface PlaygroundSideBarProps {
  graphqlApiHandler: () => void;
  graphqlSchemaHandler: () => void;
}

export const PlaygroundSideBar: FC<PlaygroundSideBarProps> = ({
  graphqlSchemaHandler,
  graphqlApiHandler,
}) => {
  const isSchemaOpen = usePlaygroundStore((state) => state.isSchemaOpen);

  return (
    <aside className={styles.sideBar}>
      <SquareButton isActive={isSchemaOpen} onClick={graphqlSchemaHandler}>
        {isSchemaOpen ? (
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
