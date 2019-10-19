import React, { FunctionComponent, useState, useEffect } from "react";
import { Switch } from "antd";
import map from "lodash/fp/map";
import get from "lodash/fp/get";
import styled from "styled-components";
import PhraseItem from "./PhraseItem";

const PhraseListContainer = styled.div`
  margin-top: 10px;
`;

const FilterPhrase: FunctionComponent<{}> = () => {
  const handleSwitchChange = (e) => {
    console.log({e})
  }
  return <Switch checkedChildren="번역" unCheckedChildren="원어" onChange={handleSwitchChange}/>;
};

export default FilterPhrase;
