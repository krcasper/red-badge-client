import React from 'react';
import { getUsers, editUsers, deleteUsers } from '../../Services/AdminService';
import { User } from '../../Types/User';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AdminUpsertComponent from './AdminUpsert';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

const MyTable = styled(TableContainer)({
  alignTable: 'center',
  width: '75%',
  marginTop: '0px',
  marginBottom: '0px',
  marginLeft: 'auto',
  marginRight: 'auto',
  border: '2px solid black',
});


interface AdminListProps {
    sessionToken: string | null;
}

interface AdminListState {
    users?: User[];
    loading?: boolean;
}

class AdminList extends React.Component<AdminListProps, AdminListState> {
    constructor(props: AdminListProps){
        super(props);

        this.state = {};
        
    }

    onUpsert() {
      this.getUsers();
    }

    componentDidUpdate() {
        if (this.isLoggedIn() && !this.state.users && !this.state.loading) {
            this.getUsers();
        }

    }

    componentDidMount() {
      if (this.isLoggedIn() && !this.state.users && !this.state.loading) {
        this.getUsers();
      }
    }

    isLoggedIn() {
        return localStorage.getItem('token') !== null;
      }
    

    async getUsers(){
        try{
            this.setState({ loading: true });
            const users = await getUsers();

            this.setState({ users, loading: false });
            console.log(users);
        } catch (e){
            console.log(e)
        }

    }



    async deleteUsers(id: number) {
      await deleteUsers(id);
      this.getUsers();
    }



    displayUser(user: User) {
      return( 
      <TableRow key={user.id}>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.username}</TableCell>
      
      <TableCell>{user.checkAdmin}</TableCell>
     
     
      <TableCell>    <AdminUpsertComponent onUpsert={this.onUpsert.bind(this)} sessionToken={this.props.sessionToken} user={user}></AdminUpsertComponent>

      <Button onClick={() => this.deleteUsers(user.id)}>Delete</Button></TableCell>
    </TableRow>
    
      );
    }



    render() {
        return(
        <div>
          <Link to='/'>Back</Link>
            <MyTable>
      <Table>
        <TableHead>
          <TableRow>
            
            
            <TableCell>Email</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Is Admin</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          


        {this.state.users && this.state.users.map((user) => 
            this.displayUser(user))}
        </TableBody>
      </Table>
    </MyTable>
  
    
        </div>
        );
    }
}

export default AdminList