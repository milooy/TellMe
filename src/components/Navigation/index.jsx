import React, { useState } from "react";
import { Layout, Menu, Icon } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
const { Header, Content, Footer, Sider } = Layout;

const Logo = styled.div`
  color: white;
  font-size: 24px;
  padding: 12px 15px;
`;

const StyledSider = styled(Sider)`
  a {
    color: white;
  }
`;

const Navigation = () => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <StyledSider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <Logo>TELLME</Logo>
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item key="1">
          <Link to={ROUTES.PHRASES}>
            <Icon type="desktop" />
            <span>Phrases</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to={ROUTES.SIGN_IN}>
            <Icon type="desktop" />
            <span>Sign In</span>
          </Link>
        </Menu.Item>
      </Menu>
    </StyledSider>
  );
};
export default Navigation;
