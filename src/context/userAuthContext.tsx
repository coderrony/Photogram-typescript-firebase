import { auth } from '@/firebaseConfig';
import { FC, ReactNode, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User,
} from 'firebase/auth';
import { createContext } from 'react';
import { ProfileInfo } from '@/types';

interface IUserAuthProvider {
  className?: string;
  children: ReactNode;
}

type AuthContextData = {
  user: User | null;
  logIn: typeof logIn;
  signUp: typeof signUp;
  logOut: typeof logOut;
  googleSignIn: typeof googleSignIn;
  updateProfileInfo: typeof updateProfileInfo;
};
const logIn = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const signUp = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const logOut = () => {
  signOut(auth);
};

const googleSignIn = () => {
  const googleAuthProvider = new GoogleAuthProvider();
  return signInWithPopup(auth, googleAuthProvider);
};

const updateProfileInfo = (profileInfo: ProfileInfo) => {
  console.log('The user profileInfo is : ', profileInfo);
  return updateProfile(profileInfo.user!, {
    displayName: profileInfo.displayName,
    photoURL: profileInfo?.photoUrl,
  });
};

export const userAuthContext = createContext<AuthContextData>({
  user: null,
  logIn,
  signUp,
  logOut,
  googleSignIn,
  updateProfileInfo,
});

export const UserAuthProvider: FC<IUserAuthProvider> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        // console.log('the logged in user state is : ', user);

        setUser(user);
      }

      return () => {
        unsubscribe();
      };
    });
  });

  const value: AuthContextData = {
    user,
    logIn,
    signUp,
    logOut,
    googleSignIn,
    updateProfileInfo,
  };

  return (
    <userAuthContext.Provider value={value}>
      {children}
    </userAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(userAuthContext);
};
