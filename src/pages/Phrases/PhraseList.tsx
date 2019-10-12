import React, { FunctionComponent, useState, useEffect } from "react";
import map from "lodash/fp/map";
import styled from "styled-components";
import PhraseItem from "./PhraseItem";

const PhraseListContainer = styled.div`
  margin-top: 10px;
`;

type IProps = {
  phraseList: object[];
};

const PhraseList: FunctionComponent<IProps> = ({ phraseList }) => {
  return (
    <PhraseListContainer>
      {map(
        (phrase) => (
          <PhraseItem phrase={phrase} />
        ),
        phraseList,
      )}
    </PhraseListContainer>
  );
};

export default PhraseList;
