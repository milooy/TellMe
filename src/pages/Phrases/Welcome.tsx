import React, { FunctionComponent, useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase";
import moment from "moment";
import get from "lodash/fp/get";
import styled from "styled-components";

const WelcomeContainer = styled.div`
  margin-bottom: 20px;
`;

const Intro = styled.div`
  font-size: 30px;
  font-weight: 900;
`;

const Summary = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const Button = styled.button`
  background: #f9b202;
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
  font-weight: bold;
  color: black;
  cursor: pointer;
`;

const Welcome: FunctionComponent<{}> = () => {
  const [user, initialising, error] = useAuthState(firebase.auth());

  return (
    <WelcomeContainer>
      <Intro>Welcome, {get("displayName", user)}! Today is {moment().format("MMMM Do")}.</Intro>
      <Summary>You ✏wrote️ 3 phrases today.</Summary>
    </WelcomeContainer>
  );
};

export default Welcome;
