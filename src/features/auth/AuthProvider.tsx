import { signOut, User } from 'firebase/auth';
import { createContext, FC, ReactNode, useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

import { auth } from './firebaseConfig';
import { usePlaygroundStore } from 'store/usePlaygroundStore';
import { useSchemaStore } from 'store/useSchemaStore';
import { LoaderSection } from 'components/common/section-loader/LoaderSection';

interface AuthContextType {
  user: User | null | undefined;
  logOut: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  logOut: () => {},
});

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, isLoading] = useAuthState(auth);
  const navigate = useNavigate();
  const resetPlaygroundStates = usePlaygroundStore((state) => state.resetPlaygroundStates);
  const resetSchemaStates = useSchemaStore((state) => state.resetSchemaStates);

  const logOut = async () => {
    await signOut(auth);
    resetPlaygroundStates();
    resetSchemaStates();
    navigate('/');
  };

  const value = { user, logOut };

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? <LoaderSection className="loader-screen" /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
