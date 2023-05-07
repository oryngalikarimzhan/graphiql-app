import { FC } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button } from '../button/Button';

import { ReactComponent as CopyIcon } from '../../assets/icons/copy-icon.svg';
import styles from './ButtonCopy.module.scss';

interface IButtonCopyProps {
  text: string;
}

export const ButtonCopy: FC<IButtonCopyProps> = ({ text }) => {
  return (
    <CopyToClipboard text={text}>
      <Button className={styles.copyButton}>
        <CopyIcon height={22} width={22} />
      </Button>
    </CopyToClipboard>
  );
};
