import { FC, ReactNode } from 'react';
import classnames from 'classnames';

import styles from './EditorControl.module.scss';

const { editorControl, editorContainer, editorContent, controlPanel, editorTitle } = styles;

interface IEditorControlProps {
  children: ReactNode;
  buttons: ReactNode;
  className: string;
  title?: string | null;
}

export const EditorControl: FC<IEditorControlProps> = ({
  children,
  title = null,
  // editor,
  buttons,
  className,
}) => {
  return (
    <div className={classnames(editorControl, className)}>
      <div className={editorContainer}>
        <h3 className={editorTitle}>{title}</h3>
        <div className={editorContent}>{children}</div>
      </div>

      <div className={controlPanel}>{buttons}</div>
    </div>
  );
};
