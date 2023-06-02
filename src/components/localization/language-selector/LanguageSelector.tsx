import { FC, ReactElement } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import cookies from 'js-cookie';

import styles from './LanguageSelector.module.scss';
import { supportedLngs as languages } from '../i18n';
import { Languages, LOCALIZATION_COOKIE_KEY } from 'utils/constants/constants';
import { DropdownSelector } from 'components/common/dropdown-selector/DropdownSelector';

interface LanguageSelectorProps {
  className?: string;
}

const LanguageSelector: FC<LanguageSelectorProps> = ({ className }): ReactElement => {
  const currentLanguage = cookies.get(LOCALIZATION_COOKIE_KEY) || Languages.RU;

  const { i18n } = useTranslation();

  return (
    <DropdownSelector
      className={classnames(styles.languageSelector, className)}
      options={languages}
      defaultOption={currentLanguage}
      onChange={(language: string) => i18n.changeLanguage(language)}
    />
  );
};

export { LanguageSelector };
