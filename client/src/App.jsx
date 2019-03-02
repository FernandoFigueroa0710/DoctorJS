import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Loginscreen from "../src/login/LoginScreen.js";
import UploadScreen from "./PrimaryScreen";
import Logout from "../src/login/Logout.js";
import axios from "axios";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      isLogin: false
    };
    this.logout = this.logout.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
  }

  componentDidMount() {}

  handleLogIn(user, pw) {
    var apiBaseUrl = "http://localhost:3000/api/";
    var payload = {
      email: `${user}`,
      password: `${pw}`
    };
    axios
      .post(apiBaseUrl + "login", payload)
      .then(response => {
        if (response.data.code == 200) {
          localStorage.setItem("token", response.data.token);
          console.log("Login Succesful");
          this.setState({
            username: `${user}`,
            isLogin: true
          });
        } else if (response.data.code == 204) {
          console.log("Username password do not match");
          alert("username password do not match");
        } else {
          console.log("Username does not exists");
          alert("Username does not exist");
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  logout() {
    this.setState({
      username: "",
      isLogin: false
    });
    console.log(this.state);
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <div className="App">
            {this.state.isLogin ? (
              <UploadScreen />
            ) : (
              <Loginscreen handleLogIn={this.handleLogIn} />
            )}
            <Logout logout={this.logout} />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

/*
MuiThemeProvider
UploadScreen
MainDrawer
BrowserRouter
  path=/ Dashboard
  path   SugarSub
  path bloodPressure

Logout
 */
