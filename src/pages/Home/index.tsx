import React, { FunctionComponent, useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase";
import moment from "moment";
import get from "lodash/fp/get";
import map from "lodash/fp/map";
import { getPhrasesByUser } from "../../util/firebase-db";
import PhraseInput from "./PhraseInput";

const Landing: FunctionComponent<{}> = () => {
  const [user, initialising, error] = useAuthState(firebase.auth());
  const [phraseList, setPhraseList] = useState([]);

  async function getList() {
    const userId = get("uid", user);
    const phrases = await getPhrasesByUser(userId);
    setPhraseList(phrases);
  }

  useEffect(() => {
    // TODO: Check if there's unnessasary call
    getList();
  }, [user]);

  return (
    <div>
      <h1>Home {get("email", user)}</h1>
      <PhraseInput getList={getList} />
      {map(
        (phrase) => (
          <div>
            <div>{moment(get("timestamp", phrase)).format("MMM Do YY")}</div>
            <div>{get("phraseText", phrase)}</div>
            <div>{get("phraseTrans", phrase)}</div>
          </div>
        ),
        phraseList,
      )}
    </div>
  );
};

export default Landing;
