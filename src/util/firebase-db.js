// firebase real-time db
import firebase from "firebase";

function savePhraseToFirebase({ phraseText, phraseTrans, userId }) {
  return firebase
    .database()
    .ref(`phrases`)
    .push()
    .set({ phraseText, phraseTrans, userId, timestamp: getCurrentTime() });
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
    .orderByChild("num")
    .on("value");
  return snapshot.val();
}

async function getPhrasesByUser(userId) {
  if (!userId) {
    return;
  }
  console.log({userId})

  var ref = firebase.database().ref("phrases");
  ref.orderByChild("num").on("child_added", function(snapshot) {
    console.log("hihihihi")
    console.log(snapshot.val());
    // console.log(snapshot.key + " was " + snapshot.val().height + " meters tall");
  });

  // const snapshot = await firebase
  //   .database()
  //   .ref("phrases")
  //   .orderByChild("num")
  //   .once("value");
  
  const snapshot = await firebase
    .database()
    .ref("phrases")
    .orderByChild("num")
    .on("child_added");
  // const snapshot = await firebase
  //   .database()
  //   .ref("/phrases/")
  //   .orderByChild("userId")
  //   .equalTo(userId)
  //   .once("value");
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
