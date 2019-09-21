import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase';
import moment from 'moment';
import get from 'lodash/fp/get';
import map from 'lodash/fp/map';
import { savePhraseToFirebase, getPhrasesByUser } from '../../util/firebase-db';

const Landing = () => {
  const [user, initialising, error] = useAuthState(firebase.auth());
  const [phraseText, setPhraseText] = useState('');
  const [phraseTrans, setPhraseTrans] = useState('');
  const [phraseList, setPhraseList] = useState([]);

  async function getList() {
    const userId = get('uid', user);
    const phrases = await getPhrasesByUser(userId);
    setPhraseList(phrases);
  }

  useEffect(() => {
    getList();
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phraseText && phraseTrans && user) {
      const userId = get('uid', user);
      savePhraseToFirebase({ userId, phraseText, phraseTrans });
    }
  };
  return (
    <div>
      <h1>Home {get('email', user)}</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={phraseText}
          name="phraseText"
          placeholder="외우고 싶은 문장을 적어주세요"
          onChange={(e) => setPhraseText(e.target.value)}
        />
        <textarea
          value={phraseTrans}
          name="phraseTrans"
          placeholder="문장 뜻을 적어주세요"
          onChange={(e) => setPhraseTrans(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {map(
        (phrase) => (
          <div>
            <div>{moment(get('timestamp', phrase)).format('MMM Do YY')}</div>
            <div>{get('phraseText', phrase)}</div>
            <div>{get('phraseTrans', phrase)}</div>
          </div>
        ),
        phraseList,
      )}
    </div>
  );
};

export default Landing;
