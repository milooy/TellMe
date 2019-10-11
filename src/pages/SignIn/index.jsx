import React from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase";
import {
  loginAccountWithGoogle,
  loginAccountWithFacebook,
} from "../../util/firebase-auth";

export default (props) => {
  const [user, initialising, error] = useAuthState(firebase.auth());

  const login = () => {
    firebase.auth().signInWithEmailAndPassword("test@test.com", "password");
  };

  const logout = () => {
    firebase.auth().signOut();
  };

  const handleLoginAccountWithGoogle = async () => {
    try {
      const result = await loginAccountWithGoogle();
      console.log({result, props})
      props.history.push("/");
    } catch (error) {
      alert(error.message);
    }
  }

  if (initialising) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }
  if (user) {
    return (
      <div>
        <p>Current User: {user.email}</p>
        <button onClick={logout}>Log out</button>
      </div>
    );
  }
  return (
    <div>
      <button onClick={login}>Log in</button>
      <button onClick={handleLoginAccountWithGoogle}>Log in with google</button>
      <button onClick={loginAccountWithFacebook}>Log in with facebook</button>
    </div>
  );
};
