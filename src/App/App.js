import { PublicClientApplication } from "@azure/msal-browser";
import React from "react";
//import Header from "../components/Header";

//import StepsForm from "../components/StepsForm";
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
    debugger
  }
  async login() {
    try {
      await this.publicClientApplication.loginPopup(
        {
          scopes: config.scopes,
          prompt: "select_account",
        }
        )
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
    this.publicClientApplication.logout()
  }

  render() {
    return (
      <div className="app">
        {/* <Header /> */}
        {
          this.state.isAuthenticated ?
            <div>Hello </div> :
            <button onClick={()=>this.login()}>Login</button>
            
        }
     
      </div>
    )
  }
}

export default App;
