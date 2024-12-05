/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import app from "../firebase/Firebase.config";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  // console.log(user);
  
  const [loading, setLoading] = useState(true);

  // Sign up a user
  const createNewUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password).finally(() => {
      setLoading(false);
    });
  };

  // Log in a user
  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password).finally(() => {
      setLoading(false);
    });
  };

  // Google Sign in
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    return signInWithPopup(auth, provider).finally(() => {
      setLoading(false);
    });
  };

  // Log out a user
  const logOut = () => {
    setLoading(true);
    return signOut(auth).finally(() => {
      setLoading(false);
    });
  };

  // Observe user authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const userInfo = {
    user,
    setUser,
    auth,
    createNewUser,
    logIn,
    googleSignIn,
    logOut,
    loading,
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
