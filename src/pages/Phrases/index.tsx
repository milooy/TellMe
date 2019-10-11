import React, { FunctionComponent, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase";
import moment from "moment";
import get from "lodash/fp/get";
import map from "lodash/fp/map";
import * as ROUTES from "../../constants/routes";
import { getPhrasesByUser } from "../../util/firebase-db";
import PhraseInput from "./PhraseInput";
import Welcome from "./Welcome";

const Phrases: FunctionComponent<{}> = () => {
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

  console.log({user, initialising, error})

  if (!initialising && !user) {
    return <Redirect to={ROUTES.SIGN_IN}/>;
  }

  return (
    <div>
      <Welcome />
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

export default Phrases;
