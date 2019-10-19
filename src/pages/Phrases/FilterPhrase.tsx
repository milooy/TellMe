import React, { FunctionComponent, useState, useEffect } from "react";
import { Switch } from "antd";
import map from "lodash/fp/map";
import get from "lodash/fp/get";
import styled from "styled-components";
import PhraseItem from "./PhraseItem";
import { useAppContext } from "../../hooks/state";

const PhraseListContainer = styled.div`
  margin-top: 10px;
`;

const FilterPhrase: FunctionComponent<{}> = () => {
  const { state, actions } = useAppContext();
  console.log({state})
  const showTransLanguage = state.userSettings.showTransLanguage;

  const handleSwitchChange = (e) => {
    console.log({ e });
  };
  return (
    <Switch
      checkedChildren="번역"
      unCheckedChildren="원어"
      defaultChecked={showTransLanguage}
      onChange={handleSwitchChange}
    />
  );
};

export default FilterPhrase;
