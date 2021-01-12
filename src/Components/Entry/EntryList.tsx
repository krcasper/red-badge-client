import React from 'react';
import { getEntries } from '../../Services/EntryService';
import { Entry } from '../../Types/Entry';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


interface EntryListProps {
    sessionToken: string | null;
    // tripId: number;
    //will have tripId here for the entry list version; can hard-code a tripId "tripId1" in app.tsx
}

interface EntryListState {
    entries?: Entry[];
    loading?: boolean;
}

export class EntryList extends React.Component<EntryListProps, EntryListState> {
    constructor(props: EntryListProps){
        super(props);

        this.state = {};
        this.getEntries();
        // pass into a componentDidMount instead of constructor
        
    }

    componentDidUpdate() {
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
            const entries = await getEntries();

            this.setState({ entries, loading: false });
            console.log(entries);
        } catch (e){
            console.log(e)
        }

    }
    render() {
        return(
        
            <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Entry Name</TableCell>
            <TableCell align="right">Entry Date</TableCell>
            <TableCell align="right">Entry Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {this.state.entries && this.state.entries.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell>{entry.entryName}</TableCell>
              <TableCell align="right">{entry.entryDate}</TableCell>
              <TableCell align="right">{entry.entryDescription}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        
        );
    }
}