// firebase real-time db
import firebase from "firebase";

function savePhraseToFirebase({ phraseText, userId }) {
  return firebase
    .database()
    .ref(`phrases`)
    .push()
    .set({ phraseText, userId, timestamp: getCurrentTime() });
  // return firebase
  // 	.database()
  // 	.ref(`users/${id}`)
  // 	.set({ endpoint, time: getCurrentTime() });
}

function removeDeviceKeyInFirebase() {
  // Firebase 의 DB data 삭제 API 를 이용하여
  // Disable 한 기기의 키 값을 제거해보세요.
}

async function getUserList() {
  const snapshot = await firebase
    .database()
    .ref("/users/")
    .once("value");
  return snapshot.val();
}

async function getPhrases() {
  const snapshot = await firebase
    .database()
    .ref("/phrases/")
    .once("value");
  return snapshot.val();
}

async function getPhrasesByUser(userId) {
  if (!userId) {
    return;
  }
  const snapshot = await firebase
    .database()
    .ref("/phrases/")
    .orderByChild("userId")
    .equalTo(userId)
    .once("value");
  return snapshot.val();
}

function getCurrentTime() {
  return new Date().getTime();
}

export {
  savePhraseToFirebase,
  removeDeviceKeyInFirebase,
  getUserList,
  getPhrases,
  getPhrasesByUser
};
