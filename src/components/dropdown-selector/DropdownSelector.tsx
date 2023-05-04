import { ChangeEvent, FC, ReactElement, useState } from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import styles from './DropdownSelector.module.scss';
import { DropdownSelectorProps } from './types';

const DropdownSelector: FC<DropdownSelectorProps> = ({
  options,
  onChange,
  defaultOption,
  className,
}): ReactElement => {
  const { t } = useTranslation();

  const [selectedOption, setSelectedOption] = useState<string>(defaultOption);

  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const newOption = event.target.value;
    setSelectedOption(newOption);
    onChange(newOption);
  };

  return (
    <select
      className={cn(styles.selector, className)}
      value={selectedOption}
      onChange={handleOptionChange}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {`${t(option)}`}
        </option>
      ))}
    </select>
  );
};

export { DropdownSelector };
