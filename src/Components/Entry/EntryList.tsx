import React from 'react';
import { deleteEntry, getEntries } from '../../Services/EntryService';
import { Entry } from '../../Types/Entry';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EntryCreateComponent from './EntryCreate'
import { RouteComponentProps, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';


interface EntryListProps {
    sessionToken: string | null;
    // tripId: number;
    //will have tripId here for the entry list version; can hard-code a tripId "tripId1" in app.tsx
}

interface EntryListState {
    entries?: Entry[];
    loading?: boolean;
}

interface RouteParams {
  tripId?: string;
}

type EntryListAllProps = EntryListProps & RouteComponentProps<RouteParams>;

class EntryList extends React.Component<EntryListAllProps, EntryListState> {
    constructor(props: EntryListAllProps){
        super(props);

        this.state = {};
        
    }

    componentDidUpdate() {
        if (this.isLoggedIn() && !this.state.entries && !this.state.loading) {
            this.getEntries();
        }

    }

    componentDidMount() {
      if (this.isLoggedIn() && !this.state.entries && !this.state.loading) {
        this.getEntries();
      }
    }

    isLoggedIn() {
        return localStorage.getItem('token') !== null;
      }
    

    async getEntries(){
        try{
            this.setState({ loading: true });
            const entries = await getEntries(this.getTripId())

            this.setState({ entries, loading: false });
            console.log(entries);
        } catch (e){
            console.log(e)
        }

    }

    getTripId(){
      return parseInt(this.props.match.params.tripId as string);
    }

    onCreate() {
      this.getEntries();
    }

    async deleteEntry(entryId: number) {
      await deleteEntry(entryId);
      this.getEntries();
    }


    render() {
        return(
        <div>
          <Link to='/'>Back</Link>
            <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            
            <TableCell align="left">Entry Date</TableCell>
            <TableCell align="left">Entry Name</TableCell>
            <TableCell>Entry Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {this.state.entries && this.state.entries.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell align="left">{entry.entryDate}</TableCell>
              <TableCell align="left">{entry.entryName}</TableCell>
              <TableCell>{entry.entryDescription}</TableCell>
              <TableCell><Button onClick={() => this.deleteEntry(entry.id)}>Delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  
      {this.isLoggedIn() && <EntryCreateComponent tripId={this.getTripId()} onCreate={this.onCreate.bind(this)} sessionToken={this.props.sessionToken}></EntryCreateComponent>}
        </div>
        );
    }
}

export default withRouter(EntryList);