import {
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../app/(auth)/firebase';

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setSession(user);
      setIsLoading(false);
    });

    return unsub;
  }, []);

  const signIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (e) {
      console.error("Firebase signIn failed", e);
      return false;
    }
  };

  const register = async (email, password, displayName) => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCred.user, { displayName });
      return true;
    } catch (e) {
      console.error("Registration error:", e);
      return false;
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return true;
    } catch (error) {
      console.error("Password reset failed:", error);
      return false;
    }
  };


  const signOut = async () => {
    await firebaseSignOut(auth);
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        isLoading,
        signIn,
        register,
        signOut,
        resetPassword
      }}>
      {children}
    </AuthContext.Provider>
  );
}
