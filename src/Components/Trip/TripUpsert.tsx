import React, { ChangeEvent } from 'react';
import { createTrip, editTrip } from '../../Services/TripService';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Trip } from '../../Types/Trip';
import '../Styling/Login.css'



type TripUpsertProps = {
    sessionToken: string | null;
    onUpsert: () => void;
    existingTrip?: Trip;
}

interface TripUpsertState {
    tripName: string;
    tripDescription: string;
    tripDates: string;
    show: boolean;
}

export class TripUpsertComponent extends React.Component<TripUpsertProps, TripUpsertState> {
    constructor(props: TripUpsertProps){
        super(props);
        if (props.existingTrip) {
            this.state={
                tripName: props.existingTrip.tripName,
                tripDescription: props.existingTrip.tripDescription,
                tripDates: props.existingTrip.tripDates,
                show: false,
            };
        } else {
            this.state={
                tripName: '',
                tripDescription: '',
                tripDates: '',
                show: false,
            };
        }
    }

   

    handleSubmit = async (e: React.SyntheticEvent) => {
        if (this.props.existingTrip) {
            await editTrip(this.state.tripName, this.state.tripDescription, this.state.tripDates, this.props.existingTrip.id);
        } else {
            await createTrip(this.state.tripName, this.state.tripDescription, this.state.tripDates);
        }
        this.props.onUpsert();
        this.setState({ show: false });
    }


    

    handleChangeTripName(e: ChangeEvent<HTMLInputElement>){
        this.setState({
            tripName: e.target.value,
        })
    }

    handleChangeTripDescription(e: ChangeEvent<HTMLInputElement>){
        this.setState({
            tripDescription: e.target.value,
        })
    }

    handleChangeTripDates(e: ChangeEvent<HTMLInputElement>){
        this.setState({
            tripDates: e.target.value,
        })
    }

    showModal() {
        this.setState({ show: true });
    }

    onClose() {
        this.setState({ show: false });
    }

    getButton() {
        if (this.props.existingTrip) {
            return <Button onClick={this.showModal.bind(this)}>Edit</Button>
        } else {
            return <Button onClick={this.showModal.bind(this)}>Add a new trip</Button>
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
                        <h1>{this.props.existingTrip ? 'Edit Trip' : 'New Trip'}</h1>
                    <form>
                    <TextField value={this.state.tripName} label="tripName" variant="outlined" onChange={this.handleChangeTripName.bind(this)}/>
                    <br />
                    <TextField value={this.state.tripDates} label="tripDates" variant="outlined" onChange={this.handleChangeTripDates.bind(this)}/>
                    <br />
                    <TextField value={this.state.tripDescription} label="tripDescription" variant="outlined" onChange={this.handleChangeTripDescription.bind(this)}/>
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

export default TripUpsertComponent;