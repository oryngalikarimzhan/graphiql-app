import { FC } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { SquareButton } from '../square-button/SquareButton';

import { ReactComponent as CopyIcon } from '../../../assets/icons/copy-icon.svg';

interface ICopyButtonProps {
  text: string;
}

export const CopyButton: FC<ICopyButtonProps> = ({ text }) => {
  return (
    <CopyToClipboard text={text}>
      <SquareButton>
        <CopyIcon height={22} width={22} />
      </SquareButton>
    </CopyToClipboard>
  );
};
