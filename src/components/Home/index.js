import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from "firebase";
import get from "lodash/fp/get";
import { savePhraseToFirebase, getPhrases, getPhrasesByUser } from "../../util/firebase-db"

const Landing = () => {
  const [user, initialising, error] = useAuthState(firebase.auth());
  const [phraseText, setPhraseText] = useState(null);
  const [phraseList, setPhraseList] = useState([]);
  console.log({user})
  // getPhraseList();

  async function getList() {
    const userId = get("uid", user)
    // const phrases = await getPhrases();
    const phrases = await getPhrasesByUser(userId);
    setPhraseList(phrases);
  }

  useEffect(() => {
    getList();
  }, [])

  console.log({phraseList})


  const handleSubmit = (e) => {
    e.preventDefault();
    if (phraseText && user) {
      const userId = get("uid", user)
      savePhraseToFirebase({userId, phraseText})
    }
  }
  return (
    <div>
      <h1>Home {get("email", user)}</h1>
      <form onSubmit={handleSubmit}>
        <textarea value={phraseText} onChange={e => setPhraseText(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Landing;
