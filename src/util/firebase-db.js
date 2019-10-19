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

export function updatePoint({ type, phraseId, prevPoint }) {
  console.log(prevPoint, prevPoint + 1)
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

export async function getPhrases() {
  const snapshot = await firebase
    .database()
    .ref("/phrases/")
    .once("value");
  return snapshot.val();
}

export async function getPhrasesByUser(userId) {
  if (!userId) {
    return;
  }
  console.log({ userId });
  const snapshot = await firebase
    .database()
    .ref("/phrases/")
    .orderByChild("userId")
    .equalTo(userId)
    .once("value");
  return snapshot.val();
}

function _getCurrentTime() {
  return new Date().getTime();
}
