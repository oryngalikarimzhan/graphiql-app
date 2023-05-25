import { FC, ReactElement } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import cookies from 'js-cookie';

import { Languages, LOCALIZATION_COOKIE_KEY } from 'utils/constants/constants';
import { supportedLngs as languages } from '../i18n';
import styles from './LanguageSelector.module.scss';
import { DropdownSelector } from '../../../components/common/dropdown-selector/DropdownSelector';
import { ILanguageSelectorProps } from './types';

const LanguageSelector: FC<ILanguageSelectorProps> = ({ className }): ReactElement => {
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
