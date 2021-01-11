import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import firebase from "firebase/app";

const AuthContext = createContext();

const AuthProvider = (props) => {
  const [currentUser, setUser] = useState();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
    });

    return unsubscribe;
  }, []);

  const signUpWithEmail = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const loginWithEmail = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const signInWithGoogle = () => {
    auth
      .signInWithPopup(firebase.auth.GoogleAuthProvider())
      .then((result) => {
        setUser(result.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signOut = () => {
    return auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signUpWithEmail,
        loginWithEmail,
        signInWithGoogle,
        signOut,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => {
  return useContext(AuthContext);
};
