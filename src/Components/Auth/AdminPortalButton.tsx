import { Button } from "@material-ui/core";
import React from "react";
import { User } from "../../Types/User";

interface AdminPortalButtonProps {
    onPress: () => void;
    user: User;
}

export class AdminPortalButton extends React.Component<AdminPortalButtonProps>{
    isAdmin() {
        return this.props.user && this.props.user.checkAdmin;
      }
    
    
    render() {
        return this.isAdmin() && <Button onClick={this.props.onPress}>Admin Portal</Button>;
    }
    
}