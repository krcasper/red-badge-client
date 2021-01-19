import React, { ChangeEvent } from 'react';
import { editUsers } from '../../Services/AdminService';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { User } from '../../Types/User';
import '../Styling/Login.css';
import { Checkbox } from '@material-ui/core';

type AdminUpsertProps = {
    sessionToken: string | null;
    onUpsert: () => void;
    user: User;
}

interface AdminUpsertState {
    email: string;
    username: string;
    checkAdmin: boolean;
    show: boolean;
}

export class AdminUpsertComponent extends React.Component<AdminUpsertProps, AdminUpsertState> {
    constructor(props: AdminUpsertProps){
        super(props);
        this.state={
            username: props.user.username,
            email: props.user.email,
            checkAdmin: props.user.checkAdmin,
            show: false,
        };
    }
    

   

    handleSubmit = async (e: React.SyntheticEvent) => {
        await editUsers(this.state.email, this.state.username, this.state.checkAdmin, this.props.user.id);
        this.props.onUpsert();
        this.setState({ show: false });
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


    handleChangeCheckAdmin(e: ChangeEvent<HTMLInputElement>){
        this.setState({
            checkAdmin: e.target.checked,
        })
    }

    showModal() {
        this.setState({ show: true });
    }

    onClose() {
        this.setState({ show: false });
    }

    getButton() {
        if (this.props.user) {
            return <Button onClick={this.showModal.bind(this)}>Edit</Button>
        } else {
            return <Button onClick={this.showModal.bind(this)}>Add a new entry</Button>
        }
    }


    render() {


        return (
            <React.Fragment>
                {this.getButton()}
            <Modal
                    open={this.state.show}
                    onClose={this.onClose.bind(this)}  >
                    <div id='login'>
                        <h1>Edit User</h1>
                    <form>
                    <TextField value={this.state.email} label="email" variant="outlined" onChange={this.handleChangeEmail.bind(this)}/>
                    <br />
                    <TextField value={this.state.username} label="username" variant="outlined" onChange={this.handleChangeUsername.bind(this)}/>
                    <br />
                    <Checkbox value={this.state.checkAdmin} onChange={this.handleChangeCheckAdmin.bind(this)}/>
                    <br />
                    <br />
                    <Button id="submit" variant="contained" onClick={this.handleSubmit.bind(this)}>Submit</Button>


                    </form>
                    </div>
                </Modal>
                </React.Fragment>
                
                    
        );


    }
}

export default AdminUpsertComponent;