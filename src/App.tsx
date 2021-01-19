import React from 'react';
import {LoginComponent} from "./Components/Auth/Login";
import {RegisterComponent} from "./Components/Auth/Register"
import Button from '@material-ui/core/Button';
import './App.css';
import { TripList } from './Components/Trip/TripList';
import EntryList from './Components/Entry/EntryList'
import AdminList from './Components/Admin/AdminPortal'
import { Logout } from './Components/Auth/Logout';
import { Login } from './Services/LoginService';
import { Register } from './Services/RegisterService';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
  RouteComponentProps
} from "react-router-dom";
import './App.css'; 
import travelduck from './assets/travelduck.jpg';
import { User } from './Types/User';
import { getMyUser } from './Services/UserService';
import { AdminPortalButton } from './Components/Auth/AdminPortalButton';
import NavBar from './Components/Navigation/Navbar';

interface AppProps {

}

interface AppState {

  sessionToken: string | null;
}

type AppAllProps = AppProps;

class App extends React.Component<AppAllProps, AppState> {
  constructor(props: AppAllProps){
    super(props);

    this.state = {
      sessionToken: null,
    };
  }

  async componentDidMount() {
    const sessionToken = localStorage.getItem('token');
    if(sessionToken) {
      this.setState({ sessionToken });
      
    }
  }

  setSessionToken (sessionToken: string | null) {
    this.setState({ sessionToken });
  }

  render() {
    return ( <Router>
      <div className="App">

        <NavBar sessionToken={this.state.sessionToken} setSessionToken={this.setSessionToken.bind(this)} />
        
        
        <h1>welcome to wander-duck</h1>
        
        <img src={travelduck} alt={"travelduck"} />
        <h4>A travel planning and itinerary building web application</h4>
        

        

        


      


      
      <Switch>
        <Route path='/' exact>      
          {this.isLoggedIn() && <TripList sessionToken={this.state.sessionToken}></TripList>}
        </Route>
        <Route exact path='/admin'>
          {this.isLoggedIn() && <AdminList sessionToken={this.state.sessionToken}></AdminList>}
        </Route>
        <Route path='/:tripId'>
          {this.isLoggedIn() && <EntryList sessionToken={this.state.sessionToken}></EntryList>}
        </Route>
      </Switch>
     


      </div>
      </Router>
    );
  }

  isLoggedIn() {
    return this.state.sessionToken !== null;
  }
  
}



export default App;