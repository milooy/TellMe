// firebase real-time db
import firebase from "firebase";

export function savePhraseToFirebase({ phraseText, phraseTrans, userId }) {
  return firebase
    .database()
    .ref(`phrases`)
    .push()
    .set({
      phraseText,
      phraseTrans,
      userId,
      timestamp: _getCurrentTime(),
      rightPoint: 0,
      wrongPoint: 0,
    });
}

export function setBaseLanguage({ userId, type }) {
  if (type === "ORIGINAL") {
    return firebase
      .database()
      .ref(`/userSettings/${userId}`)
      .set({
        baseLanguageType: type,
      });
  }

  if (type === "FOREIGN") {

  }

}

export function updatePoint({ type, phraseId, prevPoint }) {
  console.log(prevPoint, prevPoint + 1);
  if (type === "RIGHT") {
    return firebase
      .database()
      .ref(`phrases/${phraseId}`)
      .update({
        rightPoint: (prevPoint || 0) + 1,
        timestamp: _getCurrentTime(),
      });
  }

  if (type === "WRONG") {
    return firebase
      .database()
      .ref(`phrases/${phraseId}`)
      .update({
        wrongPoint: (prevPoint || 0) + 1,
        timestamp: _getCurrentTime(),
      });
  }
}

/*
  @Depreated

  async function getList() {
    const phrases = await getPhrasesByUser(userId);
    setPhraseList(phrases);
  }
*/
export async function getPhrasesByUserOnce(userId) {
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

/*
  @Depreated: You can use this like
  async function getList() {
    const phrases = await getPhrasesByUser(userId);
    setPhraseList(phrases);
  }
*/
export function getPhrasesByUserReturnPromise(userId = "") {
  return new Promise(function(resolve, reject) {
    firebase
      .database()
      .ref("/phrases/")
      .orderByChild("userId")
      .equalTo(userId)
      .on("value", function(snapshot) {
        console.log("계속 불리냐?", snapshot.val());
        return resolve(snapshot.val());
      });
  });
}

export function getPhrasesByUserListener(userId = "") {
  return firebase
    .database()
    .ref("/phrases/")
    .orderByChild("userId")
    .equalTo(userId);
}

function _getCurrentTime() {
  return new Date().getTime();
}
