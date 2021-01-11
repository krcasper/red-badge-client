import React from 'react';
import {LoginComponent} from "./Components/Auth/Login";
import {RegisterComponent} from "./Components/Auth/Register"
import Button from '@material-ui/core/Button';
import './App.css';
import { TripList } from './Components/Trip/TripList';

interface AppProps {

}

interface AppState {
  showLogin: boolean;
  showRegister: boolean;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps){
    super(props);

    this.state = {
      showLogin: false,
      showRegister: false,
    };
  }

  handleLoginClose() {
    this.setState({
      showLogin: false,
    });
  }

  handleLogin() {
    this.setState({
      showLogin: true,
    });
  }

  handleRegisterClose() {
    this.setState({
      showRegister: false,
    });
  }

  handleRegister() {
    this.setState({
      showRegister: true,
    });
  }

  render() {
    return (
      <div className="App">
        <LoginComponent
      show={this.state.showLogin}
      onClose={this.handleLoginClose.bind(this)}  />
      <Button variant="contained" onClick={this.handleLogin.bind(this)}>Login</Button>

      <RegisterComponent
      show={this.state.showRegister}
      onClose={this.handleRegisterClose.bind(this)}  />
      <Button variant="contained" onClick={this.handleRegister.bind(this)}>Register</Button>

      <TripList></TripList>
      </div>
    );
  }
  
}



export default App;