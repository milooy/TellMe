import { Layout } from "antd";
import "antd/dist/antd.css";
import React, { Component } from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "../components/Navigation";
import * as ROUTES from "../constants/routes";
import { firebaseInit } from "../Firebase";
import HomePage from "./Home";
import LandingPage from "./Landing";
import SignInPage from "./SignIn";

export default class App extends Component {
  constructor(props: {}) {
    super(props);
    firebaseInit();
  }

  public render() {
    return (
      <Router>
        <Layout style={{ minHeight: "100vh" }}>
          <Navigation />
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route path={ROUTES.TODAY} component={HomePage} />
        </Layout>
      </Router>
    );
  }
}

// import * as React from "react";

// export interface HelloProps { compiler: string; framework: string; }

// export default (props: HelloProps) => <h1>Hello from {props.compiler} and {props.framework}!</h1>;
