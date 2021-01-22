import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import firebase from "firebase/app";
import { message } from "antd";

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
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((result) => {
        setUser(result.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const connectGoogleAccount = () => {
    if (currentUser) {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.currentUser
        .linkWithPopup(provider)
        .then((res) => {
          console.log(res);
          auth
            .getRedirectResult()
            .then((result) => {
              if (result.credential) {
                console.log(result);
              }
            })
            .catch((e) => {
              console.log(e.message);
            });
        })
        .catch((e) => {
          console.log(e.message);
        });
    }
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
        connectGoogleAccount,
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
