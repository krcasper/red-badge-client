import React from 'react';
import {LoginComponent} from "./Components/Auth/Login";
import {RegisterComponent} from "./Components/Auth/Register"
import Button from '@material-ui/core/Button';
import './App.css';
import { TripList } from './Components/Trip/TripList';
import EntryList from './Components/Entry/EntryList'
import { Logout } from './Components/Auth/Logout';
import { Login } from './Services/LoginService';
import { Register } from './Services/RegisterService';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css'; 

interface AppProps {

}

interface AppState {
  showLogin: boolean;
  showRegister: boolean;
  sessionToken: string | null;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps){
    super(props);

    this.state = {
      showLogin: false,
      showRegister: false,
      sessionToken: null,
    };
  }

  componentDidMount() {
    this.setState({ sessionToken: localStorage.getItem('token')});
  }

  closeModals() {
    this.setState({
      showLogin: false,
      showRegister: false,
    });
  }

  handleOpenLogin() {
    this.setState({
      showLogin: true,
    });
  }


  handleOpenRegister() {
    this.setState({
      showRegister: true,
    });
  }


  isNotLoggedIn() {
    return this.state.sessionToken === null;
  }


  isLoggedIn() {
    return this.state.sessionToken !== null;
  }

  logout() {
    localStorage.removeItem('token');
    this.setState({ sessionToken: null });
  }

  async handleLogin(username: string, password: string) {
    const sessionToken = await Login(username, password);
    console.log(sessionToken);
    this.setState({
      sessionToken,
      showLogin: false,
    });
 }

 async handleRegister(email: string, username: string, password: string) {
  const sessionToken = await Register(email, username, password);
  console.log(sessionToken);
  this.setState({
    sessionToken,
    showRegister: false,
  });
} 

  render() {
    return (
      <div className="App">
        <h1>The Wandering Goat</h1>
        <h4>A travel planning and itinerary building web application</h4>
        

        <img src='https://images.pexels.com/photos/2832038/pexels-photo-2832038.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'/>

        <LoginComponent
      handleLogin={this.handleLogin.bind(this)}
      show={this.state.showLogin}
      onClose={this.closeModals.bind(this)}  />
      
      {this.isNotLoggedIn() && <Button variant="contained" onClick={this.handleOpenLogin.bind(this)}>Login</Button>}

      <RegisterComponent
      handleRegister={this.handleRegister.bind(this)}
      show={this.state.showRegister}
      onClose={this.closeModals.bind(this)}  />
      
      {this.isNotLoggedIn() && <Button variant="contained" onClick={this.handleOpenRegister.bind(this)}>Register</Button>}

      
      <Logout onLogout={this.logout.bind(this)}></Logout>


      


      <Router>
      <Switch>
        <Route path='/' exact>      
          {this.isLoggedIn() && <TripList sessionToken={this.state.sessionToken}></TripList>}
        </Route>

        <Route path='/:tripId'>
          {this.isLoggedIn() && <EntryList sessionToken={this.state.sessionToken}></EntryList>}
        </Route>
      </Switch>
     </Router>


      </div>
    );
  }
  
}



export default App;