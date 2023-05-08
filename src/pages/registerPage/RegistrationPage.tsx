import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import './RegistrationPage.module.scss';
import SignUp from '../../components/sign-up/SignUp';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/FirebaseConfig';

const RegistrationPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      navigate('/main');
    }
  }, [user, loading, navigate]);

  return (
    <div className="wrapper">
      <SignUp></SignUp>
    </div>
  );
};

export default RegistrationPage;
