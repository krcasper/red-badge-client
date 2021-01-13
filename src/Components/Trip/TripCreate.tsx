import React, { ChangeEvent } from 'react';
import { createTrip } from '../../Services/TripCreateService';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';



type TripCreateProps = {
    sessionToken: string | null;
    onCreate: () => void;
}

interface TripCreateState {
    tripName: string;
    tripDescription: string;
    tripMembers: string;
    show: boolean;
}

export class TripCreateComponent extends React.Component<TripCreateProps, TripCreateState> {
    constructor(props: TripCreateProps){
        super(props);
        this.state={
            tripName: '',
            tripDescription: '',
            tripMembers: '',
            show: false,
        };
    }

    handleSubmit = async (e: React.SyntheticEvent) => {
        await createTrip(this.state.tripName, this.state.tripDescription, this.state.tripMembers);
        this.props.onCreate();
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

    handleChangeTripMembers(e: ChangeEvent<HTMLInputElement>){
        this.setState({
            tripMembers: e.target.value,
        })
    }

    showModal() {
        this.setState({ show: true });
    }

    onClose() {
        this.setState({ show: false });
    }


    render() {


        return (
            <div>
                <Button onClick={this.showModal.bind(this)}>Add a new trip</Button>
            <Modal
                    open={this.state.show}
                    onClose={this.onClose.bind(this)}  >
                    <div id='newTrip'>
                        <h1>New Trip</h1>
                    <form>
                    <TextField label="tripName" variant="outlined" onChange={this.handleChangeTripName.bind(this)}/>
                    <TextField label="tripDescription" variant="outlined" onChange={this.handleChangeTripDescription.bind(this)}/>
                    <TextField label="tripMembers" variant="outlined" onChange={this.handleChangeTripMembers.bind(this)}/>
                    <Button id="submit" variant="contained" onClick={this.handleSubmit.bind(this)}>Submit</Button>


                    </form>
                    </div>
                </Modal>
                </div>
                
                    
        );

    }
}

export default TripCreateComponent;