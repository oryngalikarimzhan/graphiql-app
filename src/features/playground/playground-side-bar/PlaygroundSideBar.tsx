import { FC } from 'react';

import styles from './PlaygroundSideBar.module.scss';
import { SquareButton } from 'components/common/buttons/square-button/SquareButton';
import { ReactComponent as DocsIcon } from 'assets/icons/docs-icon.svg';
import { ReactComponent as ExecutorIcon } from 'assets/icons/executor-icon.svg';
import { ReactComponent as FilledDocsIcon } from 'assets/icons/filled-docs-icon.svg';
import { usePlaygroundStore } from 'store/usePlaygroundStore';

interface PlaygroundSideBarProps {
  onExecutorButtonClick: () => void;
}

export const PlaygroundSideBar: FC<PlaygroundSideBarProps> = ({ onExecutorButtonClick }) => {
  const [isSchemaOpen, setIsSchemaOpen] = usePlaygroundStore((state) => [
    state.isSchemaOpen,
    state.setIsSchemaOpen,
  ]);

  return (
    <aside className={styles.sideBar}>
      <SquareButton isActive={isSchemaOpen} onClick={() => setIsSchemaOpen(!isSchemaOpen)}>
        {isSchemaOpen ? (
          <FilledDocsIcon height={22} width={18} />
        ) : (
          <DocsIcon height={22} width={18} />
        )}
      </SquareButton>
      <SquareButton className={styles.executorButton} onClick={onExecutorButtonClick}>
        <ExecutorIcon />
      </SquareButton>
    </aside>
  );
};
