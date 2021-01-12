import React, { ChangeEvent } from 'react';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Register } from '../../Services/RegisterService';
import '../Styling/Register.css';

interface RegisterProps {
    show: boolean;
    onClose: () => void;
    handleRegister: (email: string, username: string, password: string) => void;
}

interface RegisterState {
    email: string;
    username: string;
    password: string;
}

export class RegisterComponent extends React.Component<RegisterProps, RegisterState> {
    constructor(props: RegisterProps){
        super(props);

        this.state={
            email: '',
            username: '',
            password: '',
        };
    }

    

    handleChangeEmail(e: ChangeEvent<HTMLInputElement>){
        this.setState({
            email: e.target.value,
        })
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

    handleRegister() {
        this.props.handleRegister(this.state.email, this.state.username, this.state.password);
    }

    render() {


        return (
            <div>
                <Modal
                    open={this.props.show}
                    onClose={this.props.onClose}  >
                    <div id='register'>
                        <h1>Register</h1>
                    <form noValidate autoComplete="off">
                    <TextField id="registerEmail" label="Email" variant="outlined" onChange={this.handleChangeEmail.bind(this)}/>
                    <br />
                    <TextField id="registerUsername" label="Username" variant="outlined" onChange={this.handleChangeUsername.bind(this)}/>
                    <br />
                    <TextField id="registerPassword" label="Password" variant="outlined" onChange={this.handleChangePassword.bind(this)}/>
                    <br />
                    <br />
                    <Button id="submit" variant="contained" onClick={this.handleRegister.bind(this)}>Submit</Button>
                    </form>
                    </div>
                </Modal>
            </div>
        );

    }
}
