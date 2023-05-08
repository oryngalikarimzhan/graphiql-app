import React, { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import styles from './AuthForm.module.scss';
import { IAuthFormInputs, IAuthProps } from './types';
import TextInput from '../text-input/TextInput';
import Message from '../message/Message';

const AuthForm: FC<IAuthProps> = ({ handleClick, buttonName, errorMessage, disabled }) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthFormInputs>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<IAuthFormInputs> = (data, e) => {
    e?.preventDefault();

    if (handleClick) {
      handleClick({
        email: data.email || '',
        password: data.password || '',
      });
    }
  };

  return (
    <form className={classnames(styles.authForm)} onSubmit={handleSubmit(onSubmit)} noValidate>
      <TextInput
        label={t('email')}
        id="email"
        type="email"
        aria-label="email"
        formRegister={register('email', {
          required: {
            value: true,
            message: t('validate-msg-enter-email'),
          },
          // minLength: {
          //   value: 8,
          //   message: t('validate-msg-8-chars'),
          // },
          pattern: {
            value:
              /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            message: t('validate-msg-email-not-valid'),
          },
        })}
        error={errors.email}
      ></TextInput>
      <TextInput
        label={t('pass')}
        id="password"
        type="password"
        aria-label="password"
        formRegister={register('password', {
          required: {
            value: true,
            message: t('validate-msg-enter-password'),
          },
          // minLength: {
          //   value: 8,
          //   message: t('validate-msg-8-chars'),
          // },
          // pattern: {
          //   value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i,
          //   message: t('validate-msg-password-should-contain-letter-number-special'),
          // },
        })}
        error={errors.password}
      ></TextInput>
      {errorMessage && <Message isError>{errorMessage}</Message>}
      <button
        disabled={disabled}
        type="submit"
        className={classnames(styles.authFormBtn)}
        role="submit-btn"
      >
        {buttonName}
      </button>
    </form>
  );
};

export default AuthForm;
