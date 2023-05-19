import { FC } from 'react';

import styles from '../Playground.module.scss';
import { useActions, useAppSelector } from '../../../store/hooks';
import { SquareButton } from '../../buttons/square-button/SquareButton';
import { ReactComponent as DocsIcon } from '../../../assets/icons/docs-icon.svg';
import { ReactComponent as ExecutorIcon } from '../../../assets/icons/executor-icon.svg';
import { ReactComponent as FilledDocsIcon } from '../../../assets/icons/filled-docs-icon.svg';

export const PlaygroundSideBar: FC = ({ getData }) => {
  const { queryEditorValue, schemaIsOpen, variablesEditorValue } = useAppSelector(
    (state) => state.playground
  );
  const { setSchemaIsOpen, setResponseEditorValue } = useActions();

  const graphqlApiHandler = async () => {
    const data = await getData({
      query: queryEditorValue,
      variables: variablesEditorValue ? JSON.parse(variablesEditorValue) : '',
    });
    if (data.error) {
      setResponseEditorValue(JSON.stringify(data.error.data, null, '\t'));
    } else setResponseEditorValue(JSON.stringify(data.data, null, '\t'));
  };

  return (
    <aside className={styles.sideBar}>
      <SquareButton isActive={schemaIsOpen} onClick={() => setSchemaIsOpen(!schemaIsOpen)}>
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
