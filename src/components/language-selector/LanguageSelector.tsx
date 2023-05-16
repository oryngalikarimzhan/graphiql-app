import { FC, ReactElement } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import cookies from 'js-cookie';

import { Language, LOCALIZATION_COOKIE_KEY } from '../../configs/constants';
import { supportedLngs as languages } from '../../configs/i18n';
import styles from './languageSelector.module.scss';
import { DropdownSelector } from '../dropdown-selector/DropdownSelector';
import { ILanguageSelectorProps } from './types';

const LanguageSelector: FC<ILanguageSelectorProps> = ({ className }): ReactElement => {
  const currentLanguage = cookies.get(LOCALIZATION_COOKIE_KEY) || Language.RU;

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
