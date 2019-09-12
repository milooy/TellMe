import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import "antd/dist/antd.css";

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Navigation from './Navigation';
// import LandingPage from '../Landing';
// import SignUpPage from '../SignUp';
import SignInPage from './SignIn';
import HomePage from './Home/index.jsx';
import { firebaseInit } from '../Firebase';
import * as ROUTES from '../constants/routes';

export default class App extends Component {
  constructor(props) {
    super(props)
    firebaseInit()
  }

render() {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh'}}>
        <Navigation />
        <hr />
        {/* <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} /> */}
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.HOME} component={HomePage} />
      </Layout>
    </Router>
  );
  }
}