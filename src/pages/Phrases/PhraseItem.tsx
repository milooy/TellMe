import React, { FunctionComponent, useState, useEffect } from "react";
import get from "lodash/fp/get";
import moment from "moment";
import styled from "styled-components";
import Collapse from "../../components/Collapse";

const PhraseHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
const PhraseText = styled.div``;
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
const Calculated = styled.div``;

type IProps = {
  phrase: Object;
};

const PhraseItem: FunctionComponent<IProps> = ({ phrase }) => {
  const handleClickYes = (e) => {
    e.stopPropagation();
  };

  const handleClickNo = (e) => {
    e.stopPropagation();
  };

  return (
    <Collapse
      header={
        <PhraseHeader>
          <LeftPane>
            <Status />
            <PhraseText>{get("phraseText", phrase)}</PhraseText>
          </LeftPane>
          <ButtonContainer>
            <YesButton onClick={handleClickYes}>🙂</YesButton>
            <NoButton onClick={handleClickNo}>🤔</NoButton>
          </ButtonContainer>
        </PhraseHeader>
      }
      contents={
        <PhraseContents>
          <div>{get("phraseTrans", phrase)}</div>
          <ContentsFooter>
            <div>{moment(get("timestamp", phrase)).format("YY/MM/DD")}</div>
            <Calculated>+8 -2 = 6</Calculated>
          </ContentsFooter>
        </PhraseContents>
      }
    />
  );
};

export default PhraseItem;
