import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import styles from './AuthForm.module.scss';
import { IAuthFormInputs, IAuthFormProps } from './types';
import FormTextInputField from '../../../components/form-text-input-field/FormTextInputField';
import Message from '../../../components/message/Message';
import { SpinnerLoader } from '../../../components/common/spinner-loader/SpinnerLoader';

const AuthForm: FC<IAuthFormProps> = ({ handleClick, contentContext, errorMessage, isLoading }) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthFormInputs>({
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<IAuthFormInputs> = (data, e) => {
    e?.preventDefault();

    if (handleClick) {
      handleClick({
        email: data.email,
        password: data.password,
      });
    }
  };

  const { title, question, redirectLink, redirectLinkTitle } = contentContext;

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>{title}</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormTextInputField
          label={t('auth.form.email')}
          id="email"
          type="email"
          aria-label="email"
          formRegister={register('email', {
            required: {
              value: true,
              message: t('auth.form.validation.empty-email'),
            },
            pattern: {
              value:
                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
              message: t('auth.form.validation.invalid-email'),
            },
          })}
          error={errors.email}
        />
        <FormTextInputField
          label={t('auth.form.password')}
          id="password"
          type="password"
          aria-label="password"
          formRegister={register('password', {
            required: {
              value: true,
              message: t('auth.form.validation.empty-password'),
            },
            minLength: {
              value: 8,
              message: t('auth.form.validation.pass-length'),
            },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i,
              message: t('auth.form.validation.pass-pattern'),
            },
          })}
          error={errors.password}
        />
        {errorMessage && <Message isError>{errorMessage}</Message>}
        <button disabled={isLoading} type="submit" className={styles.formButton} role="submit-btn">
          {isLoading ? <SpinnerLoader /> : <>{title}</>}
        </button>
      </form>
      <div className={styles.redirectBlock}>
        <p>{question}</p>
        <Link to={redirectLink}>{redirectLinkTitle}</Link>
      </div>
    </div>
  );
};

export default AuthForm;