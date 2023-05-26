import { ChangeEvent, FC, ReactElement, useState } from 'react';
import classnames from 'classnames';

import styles from './DropdownSelector.module.scss';

interface DropdownSelectorProps {
  options: string[];
  onChange: (selectedOption: string) => void;
  defaultOption: string;
  className?: string;
}

const DropdownSelector: FC<DropdownSelectorProps> = ({
  options,
  onChange,
  defaultOption,
  className,
}): ReactElement => {
  const [selectedOption, setSelectedOption] = useState<string>(defaultOption);

  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const newOption = event.target.value;
    setSelectedOption(newOption);
    onChange(newOption);
  };

  return (
    <select
      className={classnames(styles.selector, className)}
      value={selectedOption}
      onChange={handleOptionChange}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export { DropdownSelector };
