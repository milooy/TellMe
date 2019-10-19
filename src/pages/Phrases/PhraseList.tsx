import React, { FunctionComponent, useState, useEffect } from "react";
import map from "lodash/fp/map";
import get from "lodash/fp/get";
import styled from "styled-components";
import FilterPhrase from "./FilterPhrase";
import PhraseItem from "./PhraseItem";
import { getFilteredPhraseList } from "./utils";

const PhraseListContainer = styled.div`
  margin-top: 10px;
`;

type IProps = {
  phraseList: any;
};

const PhraseList: FunctionComponent<IProps> = ({ phraseList }) => {
  const filteredPhraseList = getFilteredPhraseList(phraseList);

  return (
    <div>
      <PhraseListContainer>
      <FilterPhrase />
        {map(
          (phrase: any) => (
            <PhraseItem phrase={phrase} key={get("key", phrase)} />
          ),
          filteredPhraseList,
        )}
      </PhraseListContainer>
    </div>
  );
};

export default PhraseList;
