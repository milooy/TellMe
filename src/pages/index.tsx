import React, { Component } from "react";
import { Layout } from "antd";
import "antd/dist/antd.css";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "../components/Navigation";
import LandingPage from "./Landing";
import SignInPage from "./SignIn";
import HomePage from "./Home/index";
import { firebaseInit } from "../Firebase";
import * as ROUTES from "../constants/routes";

export interface HelloProps { compiler: string; framework: string; }

type ClockState = {
  time: Date
}

export default class App extends Component<{}, ClockState> {
  constructor(props: HelloProps) {
    super(props);
    firebaseInit();
  }

  render() {
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
