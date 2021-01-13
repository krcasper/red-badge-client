import React from 'react';
import { getTrips } from '../../Services/TripService';
import { Trip } from '../../Types/Trip';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';
import TripCreateComponent from './TripCreate';
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


interface TripListProps {
    sessionToken: string | null;
    //will have tripId here for the entry list version; can hard-code a tripId "tripId1" in app.tsx
}

interface TripListState {
    trips?: Trip[];
    loading?: boolean;
}

export class TripList extends React.Component<TripListProps, TripListState> {
    constructor(props: TripListProps){
        super(props);

        this.state = {};
        
    }

    componentDidUpdate() {
      if (this.isLoggedIn() && !this.state.trips && !this.state.loading) {
        this.getTrips();
    }

    }

    componentDidMount() {
      if (this.isLoggedIn() && !this.state.trips && !this.state.loading) {
        this.getTrips();
      }
    }

    isLoggedIn() {
        return localStorage.getItem('token') !== null;
      }
    

    async getTrips(){
        try{
            this.setState({ loading: true });
            const trips = await getTrips();

            this.setState({ trips, loading: false });
            console.log(trips);
        } catch (e){
            console.log(e)
        }

    }

    onCreate() {
      this.getTrips();
    }
    render() {
        return(
        <div>
            <MyTable>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><h4>Trip Name</h4></TableCell>
            <TableCell align="right"><h4>Trip Description</h4></TableCell>
            <TableCell align="right"><h4>Trip Members</h4></TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
        {this.state.trips && this.state.trips.map((trip) => (
          
            <TableRow key={trip.id}>
              <TableCell><Link to={`/${trip.id}`}>{trip.tripName}</Link></TableCell>
              <TableCell align="right">{trip.tripDescription}</TableCell>
              <TableCell align="right">{trip.tripMembers}</TableCell>
            </TableRow>
            
          ))}
        </TableBody>
      </Table>
    </MyTable>
              {this.isLoggedIn() && <TripCreateComponent onCreate={this.onCreate.bind(this)} sessionToken={this.props.sessionToken}></TripCreateComponent>}
            </div>
        );
    }
}


// const useStyles = makeStyles({
//   table: {
//     minWidth: 650,
//   },
// });

// function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
//   return { name, calories, fat, carbs, protein };
// }

// export default function BasicTable() {
//   const classes = useStyles();

//   return (
    

//NOTES - FETCH TRIPS IS FINISHING BEFORE USER LOGIN