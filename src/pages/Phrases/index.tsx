import React, { FunctionComponent, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase";
import get from "lodash/fp/get";
import * as ROUTES from "../../constants/routes";
import { getPhrasesByUserListener } from "../../util/firebase-db";
import PhraseInput from "./PhraseInput";
import PhraseList from "./PhraseList";
import Welcome from "./Welcome";

const Phrases: FunctionComponent<{}> = () => {
  const [user, initialising, error] = useAuthState(firebase.auth());
  const [phraseList, setPhraseList] = useState([]);

  function getList() {
    console.info("GET_LIST")
    const userId = get("uid", user);
    getPhrasesByUserListener(userId).on("value", function(snapshot) {
      setPhraseList(snapshot.val());
    })
  }

  useEffect(() => {
    // TODO: Check if there's unnessasary call
    getList();
  }, [user]);


  if (!initialising && !user) {
    return <Redirect to={ROUTES.SIGN_IN}/>;
  }

  return (
    <div>
      <Welcome />
      <PhraseInput />
      <PhraseList phraseList={phraseList} />
    </div>
  );
};

export default Phrases;
