import { Button } from "@material-ui/core";
import React from "react";

interface LogoutProps {
    onLogout: () => void;
}

export class Logout extends React.Component<LogoutProps>{
    isLoggedIn() {
        return localStorage.getItem('token') !== null;
      }
    
    
    render() {
        return this.isLoggedIn() && <Button onClick={this.props.onLogout}>Logout</Button>;
    }
    
}