import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Logout } from '../Auth/Logout';
import { RegisterComponent } from '../Auth/Register';
import { User } from '../../Types/User';
import { Login } from '../../Services/LoginService';
import { Register } from '../../Services/RegisterService';
import { getMyUser } from '../../Services/UserService';
import { LoginComponent } from '../Auth/Login';
import { Link } from 'react-router-dom';

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       flexGrow: 1,
//     },
//     menuButton: {
//       marginRight: theme.spacing(2),
//     },
//     title: {
//       flexGrow: 1,
//     },
//   }),
// );

interface NavBarProps {
    sessionToken: string | null;
    setSessionToken: (sessionToken: string | null) => void;
}

interface NavBarState {
    showLogin: boolean;
    showRegister: boolean;
    user?: User;
}

export default class NavBar extends React.Component<NavBarProps, NavBarState> {
    constructor(props: NavBarProps) {
        super(props);

        this.state = {
            showLogin: false,
            showRegister: false,
        };

    }

    async componentDidUpdate() {
        if (this.props.sessionToken && !this.state.user) {
         const myUser = await getMyUser(this.props.sessionToken);
          this.setState({user: myUser})
        }
     
    }

   async componentDidMount() {
       if (this.props.sessionToken) {
        const myUser = await getMyUser(this.props.sessionToken);
         this.setState({user: myUser})
       }
    
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
        return this.props.sessionToken === null;
      }
    
    
      isLoggedIn() {
        return this.props.sessionToken !== null;
      }
    
      async logout() {
        localStorage.removeItem('token');
        this.props.setSessionToken(null);
        this.setState({user: undefined})
      }
    
      async handleLogin(username: string, password: string) {
        const sessionToken = await Login(username, password);
        console.log(sessionToken);
        const myUser = await getMyUser(sessionToken);
        this.setState({
          showLogin: false,
          user: myUser,
        });
        this.props.setSessionToken(sessionToken);
     }
    
     async handleRegister(email: string, username: string, password: string) {
      const sessionToken = await Register(email, username, password);
      console.log(sessionToken);
      const myUser = await getMyUser(sessionToken);
      this.setState({
        showRegister: false,
        user: myUser,
      });
      this.props.setSessionToken(sessionToken);
    } 
    
    isAdmin() {
        return this.state.user && this.state.user.checkAdmin;
    }
    render() {
//   const classes = useStyles();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
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
      {this.isAdmin() &&  <Link to="/admin">
        Admin Portal
      </Link>}
        </Toolbar>
      </AppBar>
    </div>
  );
}
}