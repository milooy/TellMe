import React, { FunctionComponent, useState, useEffect } from "react";
import get from "lodash/fp/get";
import moment from "moment";
import styled from "styled-components";

const PhraseBox = styled.div`
  border: 1px solid black;
  background: white;
`;

type IProps = {
  phrase: Object;
};

const PhraseItem: FunctionComponent<IProps> = ({ phrase }) => {

  return (
    <PhraseBox>
      <div>{moment(get("timestamp", phrase)).format("MMM Do YY")}</div>
      <div>{get("phraseText", phrase)}</div>
      <div>{get("phraseTrans", phrase)}</div>
    </PhraseBox>
  );
};

export default PhraseItem;
