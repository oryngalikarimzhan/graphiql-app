import { User } from 'firebase/auth';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface UserAuthState {
  user: User | null | undefined;
}

interface UserAuthActions {
  setUser: (user: User | null | undefined) => void;
}

const initialState: UserAuthState = {
  user: null,
};

export const useUserAuthStore = create<UserAuthState & UserAuthActions>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        setUser: (user) =>
          set(() => ({
            user: user,
          })),

        resetUserAuthStates: () => set(initialState),
      }),
      {
        name: 'user',
      }
    )
  )
);
