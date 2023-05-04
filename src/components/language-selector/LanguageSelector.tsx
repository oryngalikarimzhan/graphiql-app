import { FC, ReactElement } from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import cookies from 'js-cookie';

import styles from './languageSelector.module.scss';
import { DropdownSelector } from '../dropdown-selector/DropdownSelector';
import { LanguageSelectorProps } from './types';

const LanguageSelector: FC<LanguageSelectorProps> = ({ className, languages }): ReactElement => {
  const currentLanguage = cookies.get('i18next') || 'ru';

  const { i18n } = useTranslation();

  return (
    <DropdownSelector
      className={cn(styles.languageSelector, className)}
      options={languages}
      defaultOption={currentLanguage}
      onChange={(language: string) => i18n.changeLanguage(language)}
    />
  );
};

export { LanguageSelector };
