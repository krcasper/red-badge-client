import React, { ChangeEvent } from 'react';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../Styling/Login.css';

interface LoginProps {
    show: boolean;
    onClose: () => void;
    handleLogin: (username: string, password: string) => void;
}

interface LoginState {
    username: string;
    password: string;
}

export class LoginComponent extends React.Component<LoginProps, LoginState> {
    constructor(props: LoginProps){
        super(props);

        this.state={
            username: '',
            password: '',
        };
    }

    

    handleChangeUsername(e: ChangeEvent<HTMLInputElement>){
        this.setState({
            username: e.target.value,
        })
    }

    handleChangePassword(e: ChangeEvent<HTMLInputElement>){
        this.setState({
            password: e.target.value,
        })
    }


    handleLogin() {
        this.props.handleLogin(this.state.username, this.state.password);
    }

    render() {
        return (
            <div>
                <Modal
                    open={this.props.show}
                    onClose={this.props.onClose}  >
                    <div id='login'>
                        <h1>Login</h1>
                    <form noValidate autoComplete="off">
                        <TextField id="loginUsername" label="Username" variant="outlined" onChange={this.handleChangeUsername.bind(this)}/>
                        <br />
                        <TextField id="loginPassword" label="Password" variant="outlined" onChange={this.handleChangePassword.bind(this)}/>
                        <br />
                        <Button id="submit" variant="contained" onClick={this.handleLogin.bind(this)}>Submit</Button>
                    </form>
                    </div>
                </Modal>
            </div>
        );

    }
}
