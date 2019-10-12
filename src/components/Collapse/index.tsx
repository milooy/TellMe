import React, { FunctionComponent, useState, useEffect } from "react";
import get from "lodash/fp/get";
import moment from "moment";
import styled from "styled-components";

const CollapseContainer = styled.div`
  border-bottom: 1px solid black;
  background: white;
`;

const Header = styled.div`
  padding: 5px 8px;
  cursor: pointer;

  &:hover {
    background: #fff6e0;
  }

`;

const Contents = styled.div`
  padding: 5px 8px;
  display: ${({ isCollapsed }) => (isCollapsed ? "none" : "block")};
`;

type IProps = {
  header: string | React.ReactNode;
  contents: string | React.ReactNode;
};

const Collapse: FunctionComponent<IProps> = ({ header, contents }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  return (
    <CollapseContainer>
      <Header
        isCollapsed={isCollapsed}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {header}
      </Header>
      <Contents isCollapsed={isCollapsed}>{contents}</Contents>
    </CollapseContainer>
  );
};

export default Collapse;
