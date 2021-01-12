import React from 'react';
import { getTrips } from '../../Services/TripService';
import { Trip } from '../../Types/Trip';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


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
        this.getTrips();
        // pass into a componentDidMount instead of constructor
        
    }

    componentDidUpdate() {
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
    render() {
        return(
        
            <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Trip Name</TableCell>
            <TableCell align="right">Trip Description</TableCell>
            <TableCell align="right">Trip Members</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {this.state.trips && this.state.trips.map((trip) => (
            <TableRow key={trip.id}>
              <TableCell>{trip.tripName}</TableCell>
              <TableCell align="right">{trip.tripDescription}</TableCell>
              <TableCell align="right">{trip.tripMembers}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        
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