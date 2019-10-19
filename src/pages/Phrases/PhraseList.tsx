import React, { FunctionComponent, useState, useEffect } from "react";
import map from "lodash/fp/map";
import forEach from "lodash/forEach";
import get from "lodash/fp/get";
import styled from "styled-components";
import PhraseItem from "./PhraseItem";

const PhraseListContainer = styled.div`
  margin-top: 10px;
`;

type IProps = {
  phraseList: any;
};

const PhraseList: FunctionComponent<IProps> = ({ phraseList }) => {
  console.log({phraseList})

  const polishedPhraseList = forEach(phraseList, (value: Object, key: string) => (
    value["key"] = key
  ));

  return (
    <PhraseListContainer>
      {map(
        (phrase: any) => (
          <PhraseItem phrase={phrase} key={get("key", phrase)} />
        ),
        polishedPhraseList,
      )}
    </PhraseListContainer>
  );
};

export default PhraseList;
