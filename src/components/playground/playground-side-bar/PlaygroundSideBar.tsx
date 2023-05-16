import { FC } from 'react';

import styles from '../Playground.module.scss';
import { useActions, useAppSelector } from '../../../store/hooks';
import { SquareButton } from '../../buttons/square-button/SquareButton';
import { ReactComponent as DocsIcon } from '../../../assets/icons/docs-icon.svg';
import { ReactComponent as ExecutorIcon } from '../../../assets/icons/executor-icon.svg';
import { ReactComponent as FilledDocsIcon } from '../../../assets/icons/filled-docs-icon.svg';

export const PlaygroundSideBar: FC = () => {
  const { queryEditorValue, schemaIsOpen } = useAppSelector((state) => state.playground);
  const { setSchemaIsOpen, setResponseEditorValue } = useActions();
  return (
    <aside className={styles.sideBar}>
      <SquareButton isActive={schemaIsOpen} onClick={() => setSchemaIsOpen(!schemaIsOpen)}>
        {schemaIsOpen ? (
          <FilledDocsIcon height={22} width={18} />
        ) : (
          <DocsIcon height={22} width={18} />
        )}
      </SquareButton>
      <SquareButton
        className={styles.executorButton}
        onClick={() => setResponseEditorValue(queryEditorValue)}
      >
        <ExecutorIcon />
      </SquareButton>
    </aside>
  );
};
