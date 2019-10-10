import React, { FunctionComponent, useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase";
import get from "lodash/fp/get";
import styled from "styled-components";
import { savePhraseToFirebase } from "../../util/firebase-db";

const PhraseInputContainer = styled.form`
  border: 1px solid black;
  background: white;

  label {
    flex-shrink: 0;
    margin-right: 5px;
  }

  textarea {
    width: 100%;
    border: none;
  }
`;

const PhraseText = styled.div`
  display: flex;
  border-bottom: 1px solid black;
  align-items: center;
  padding: 10px 7px;
`;

const PhraseTrans = styled.div`
  display: flex;
  border-bottom: 1px solid black;
  align-items: center;
  padding: 10px 7px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 7px;
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

type IProps = {
  getList: () => void;
};

const PhraseInput: FunctionComponent<IProps> = ({ getList }) => {
  const [user, initialising, error] = useAuthState(firebase.auth());
  const [phraseText, setPhraseText] = useState("");
  const [phraseTrans, setPhraseTrans] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (phraseText && phraseTrans && user) {
      const userId = get("uid", user);
      savePhraseToFirebase({ userId, phraseText, phraseTrans });
      setPhraseText("");
      setPhraseTrans("");
      getList();
    }
  };

  return (
    <PhraseInputContainer onSubmit={handleSubmit}>
      <PhraseText>
        <label>원어</label>
        <textarea
          rows={1}
          value={phraseText}
          name="phraseText"
          placeholder="외우고 싶은 문장을 적어주세요"
          onChange={(e) => setPhraseText(e.target.value)}
        />
      </PhraseText>
      <PhraseTrans>
        <label>번역</label>
        <textarea
          rows={1}
          value={phraseTrans}
          name="phraseTrans"
          placeholder="문장 뜻을 적어주세요"
          onChange={(e) => setPhraseTrans(e.target.value)}
        />
      </PhraseTrans>
      <Footer>
        <Button type="submit">Submit</Button>
      </Footer>
    </PhraseInputContainer>
  );
};

export default PhraseInput;
