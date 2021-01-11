import React from 'react';
import { getTrips } from '../../Services/TripService';
import { Trip } from '../../Types/Trip';

interface TripListProps {

}

interface TripListState {
    trips?: Trip[];
}

export class TripList extends React.Component<TripListProps, TripListState> {
    constructor(props: TripListProps){
        super(props);

        this.state = {};
        this.getTrips();
        
    }

    async getTrips(){
        try{
            const trips = await getTrips();

            this.setState({ trips });
            console.log(trips);
        } catch (e){
            console.log(e)
        }

    }
    render() {
        return(<div>
            {this.state.trips && this.state.trips.map((trip) => {
                return (<p>{trip.tripName}</p>);
            })}
        </div>);
    }
}