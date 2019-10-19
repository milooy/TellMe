import { Layout } from "antd";
import React, { Component, useEffect } from "react";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "../components/Navigation";
import * as ROUTES from "../constants/routes";
import PhrasesPage from "./Phrases";
import LandingPage from "./Landing";
import SignInPage from "./SignIn";
import { AppContext, useAppState } from "../hooks/state";

const App: React.FC = () => {
  const { state, actions } = useAppState();

  return (
    <AppContext.Provider value={{ state, actions }}>
      <Router>
        <Layout style={{ minHeight: "100vh" }}>
          <Navigation />
          <div style={{ width: "100%", padding: "10px 20px" }}>
            <Route exact path={ROUTES.PHRASES} component={PhrasesPage} />
            <Route path={ROUTES.LANDING} component={LandingPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          </div>
        </Layout>
      </Router>
    </AppContext.Provider>
  );
};

export default App;

// import * as React from "react";

// export interface HelloProps { compiler: string; framework: string; }

// export default (props: HelloProps) => <h1>Hello from {props.compiler} and {props.framework}!</h1>;
