import { FC } from 'react';

import styles from './PlaygroundSideBar.module.scss';
import { SquareButton } from 'components/common/buttons/square-button/SquareButton';
import { ReactComponent as DocsIcon } from 'assets/icons/docs-icon.svg';
import { ReactComponent as ExecutorIcon } from 'assets/icons/executor-icon.svg';
import { ReactComponent as FilledDocsIcon } from 'assets/icons/filled-docs-icon.svg';
import { ReactComponent as QueryHistoryIcon } from 'assets/icons/history-icon.svg';
import { usePlaygroundStore } from 'store/usePlaygroundStore';

interface PlaygroundSideBarProps {
  onExecutorButtonClick: () => void;
}

export const PlaygroundSideBar: FC<PlaygroundSideBarProps> = ({ onExecutorButtonClick }) => {
  const [isSideSectionOpen, currentOnSideSection, closeSideSection, changeCurrentOnSideSection] =
    usePlaygroundStore((state) => [
      state.isSideSectionOpen,
      state.currentOnSideSection,
      state.closeSideSection,
      state.changeCurrentOnSideSection,
    ]);

  return (
    <aside className={styles.sideBar}>
      <SquareButton
        isActive={isSideSectionOpen && currentOnSideSection === 'schema'}
        onClick={() =>
          isSideSectionOpen && currentOnSideSection === 'schema'
            ? closeSideSection()
            : changeCurrentOnSideSection('schema')
        }
      >
        {isSideSectionOpen && currentOnSideSection === 'schema' ? (
          <FilledDocsIcon height={22} width={18} />
        ) : (
          <DocsIcon height={22} width={18} />
        )}
      </SquareButton>
      <SquareButton className={styles.executorButton} onClick={onExecutorButtonClick}>
        <ExecutorIcon />
      </SquareButton>
      <SquareButton
        isActive={isSideSectionOpen && currentOnSideSection === 'history'}
        onClick={() =>
          isSideSectionOpen && currentOnSideSection === 'history'
            ? closeSideSection()
            : changeCurrentOnSideSection('history')
        }
      >
        <QueryHistoryIcon />
      </SquareButton>
    </aside>
  );
};
