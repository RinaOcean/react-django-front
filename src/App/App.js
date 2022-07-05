import { PublicClientApplication } from "@azure/msal-browser";
import React from "react";
import Header from "../components/Header";

import StepsForm from "../components/StepsForm";
import {config} from '../Config.js'

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isAuthenticated: false,
      user: {}
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.publicClientApplication = new PublicClientApplication({
      auth: {
        clientId: config.appId,
        redirectUri: config.redirectUri,
        authority: config.authority,   
      },
      cache: {
        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie: true,
      }
    })
    console.log(this.publicClientApplication.loginPopup);
  }
  async login() {
    debugger
    try {
      await this.publicClientApplication.loginPopup(
        {
          scopes: config.scopes,
          prompt: "select_account",
        }
      )
      debugger;
      this.setState({ isAuthenticated: true });
    } catch (e) {
      this.setState({
        isAuthenticated: false,
        user: {},
        error: e
      });
    }
  }
  
  logout() {
    this.publicClientApplication.logoutRedirect()
    this.publicClientApplication.logoutPopup()
    this.setState({
      isAuthenticated: false,
    });
   
  }
  render() {
    return (
      <div className="app">
        <Header login={this.login} isAuthenticated={this.state.isAuthenticated} logout={this.logout}/> 
        {
          this.state.isAuthenticated ?
            <StepsForm/> :
            /*<button onClick={()=>this.login()}>Login</button>*/
            <p>Login please</p>
        }
     
      </div>
    )
  }
}

export default App;
