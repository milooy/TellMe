import React, { FunctionComponent, useState, useEffect } from "react";
import get from "lodash/fp/get";
import moment from "moment";
import styled from "styled-components";
import Collapse from "../../components/Collapse";
import { updatePoint } from "../../util/firebase-db";

const PhraseHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
const PhraseText = styled.div``;
const PhraseTrans = styled.div`
  font-weight: bold;
`;
const ButtonContainer = styled.div``;
const YesButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;
const NoButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const LeftPane = styled.div`
  display: flex;
  align-items: center;
`;

const Status = styled.span`
  background: green;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 5px;
`;

const PhraseContents = styled.div`
  padding-left: 11px;
`;
const ContentsFooter = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #e2e2e2;
  font-size: 12px;
  margin-top: 6px;
  padding-top: 3px;
  color: #737373; 
`;
const PointsContainer = styled.div``;

type PhraseItemProps = {
  phrase: {
    phraseText: string,
    phraseTrans: string,
    timestamp: string,
    rightPoint: number,
    wrongPoint: number,
  };
};

const PhraseItem: FunctionComponent<PhraseItemProps> = ({ phrase }) => {
  const handleClickRight = (e) => {
    e.stopPropagation();
    console.log({phrase})
    updatePoint({
      type: "RIGHT",
      phraseId: get("key", phrase),
      prevPoint: get("rightPoint", phrase),
    });
  };

  const handleClickWrong = (e) => {
    e.stopPropagation();
    updatePoint({
      type: "WRONG",
      phraseId: get("key", phrase),
      prevPoint: get("wrongPoint", phrase),
    });
  };

  const {
    phraseText,
    phraseTrans,
    timestamp,
    rightPoint,
    wrongPoint,
  } = phrase;

  return (
    <Collapse
      header={
        <PhraseHeader>
          <LeftPane>
            <Status />
            <PhraseText>{phraseText}</PhraseText>
          </LeftPane>
          <ButtonContainer>
            <YesButton onClick={handleClickRight}>🙂</YesButton>
            <NoButton onClick={handleClickWrong}>🤔</NoButton>
          </ButtonContainer>
        </PhraseHeader>
      }
      contents={
        <PhraseContents>
          <PhraseTrans>{phraseTrans}</PhraseTrans>
          <ContentsFooter>
            <div>{moment(timestamp).format("YY/MM/DD")}</div>
            <PointsContainer>{`+${rightPoint} -${wrongPoint} = ${rightPoint - wrongPoint}`}</PointsContainer>
          </ContentsFooter>
        </PhraseContents>
      }
    />
  );
};

export default PhraseItem;
