import React, { ChangeEvent } from 'react';
import { createEntry } from '../../Services/EntryService';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../Styling/Entry.css';


type EntryCreateProps = {
    sessionToken: string | null;
    onCreate: () => void;
    tripId: number;
}

interface EntryCreateState {
    entryName: string;
    entryDate: string;
    entryDescription: string;
    show: boolean;
}

export class EntryCreateComponent extends React.Component<EntryCreateProps, EntryCreateState> {
    constructor(props: EntryCreateProps){
        super(props);
        this.state={
            entryName: '',
            entryDate: '',
            entryDescription: '',
            show: false,
        };
    }

    handleSubmit = async (e: React.SyntheticEvent) => {
        await createEntry(this.state.entryName, this.state.entryDate, this.state.entryDescription, this.props.tripId);
        this.props.onCreate();
        this.setState({ show: false });
    }

    

    handleChangeEntryName(e: ChangeEvent<HTMLInputElement>){
        this.setState({
            entryName: e.target.value,
        })
    }

    handleChangeEntryDate(e: ChangeEvent<HTMLInputElement>){
        this.setState({
            entryDate: e.target.value,
        })
    }

    handleChangeEntryDescription(e: ChangeEvent<HTMLInputElement>){
        this.setState({
            entryDescription: e.target.value,
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
                <Button onClick={this.showModal.bind(this)}>Add a new entry</Button>
            <Modal
                    open={this.state.show}
                    onClose={this.onClose.bind(this)}  >
                    <div id='newEntry'>
                        <h1>New Entry</h1>
                    <form>
                    <TextField label="entryDate" variant="outlined" onChange={this.handleChangeEntryDate.bind(this)}/>
                    <TextField label="entryName" variant="outlined" onChange={this.handleChangeEntryName.bind(this)}/>
                    <TextField label="entryDescription" variant="outlined" onChange={this.handleChangeEntryDescription.bind(this)}/>
                    <Button id="submit" variant="contained" onClick={this.handleSubmit.bind(this)}>Submit</Button>


                    </form>
                    </div>
                </Modal>
                </div>
                
                    
        );

    }
}

export default EntryCreateComponent;