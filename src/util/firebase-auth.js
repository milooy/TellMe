import firebase from "firebase";

function createAccountWithEmail(email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}

function loginAccountWithEmail(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

function loginAccountWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
}
// function loginAccountWithGoogle() {
//   const provider = new firebase.auth.GoogleAuthProvider();
//   return firebase.auth().signInWithPopup(provider);
// }

function loginAccountWithGithub() {
  const provider = new firebase.auth.GithubAuthProvider();
  return firebase.auth().signInWithPopup(provider);
}

function loginAccountWithFacebook() {
  const provider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(provider);
}

function logoutAccount() {
  return firebase.auth().signOut();
}

export {
  createAccountWithEmail,
  loginAccountWithEmail,
  loginAccountWithGoogle,
  loginAccountWithGithub,
  logoutAccount,
  loginAccountWithFacebook,
};
