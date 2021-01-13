import React, { ChangeEvent } from 'react';
import { createEntry, editEntry } from '../../Services/EntryService';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Entry } from '../../Types/Entry'
import '../Styling/Login.css';

type EntryUpsertProps = {
    sessionToken: string | null;
    onUpsert: () => void;
    existingEntry?: Entry;
    tripId: number;
}

interface EntryUpsertState {
    entryDate: string;
    entryName: string;
    entryDescription: string;
    show: boolean;
}

export class EntryUpsertComponent extends React.Component<EntryUpsertProps, EntryUpsertState> {
    constructor(props: EntryUpsertProps){
        super(props);
        if (props.existingEntry) {
            this.state={
                entryDate: props.existingEntry.entryDate,
                entryName: props.existingEntry.entryName,
                entryDescription: props.existingEntry.entryDescription,
                show: false,
            };
        } else {
            this.state={
                entryDate: '',
                entryName: '',
                entryDescription: '',
                show: false,
            };
        }
    }

   

    handleSubmit = async (e: React.SyntheticEvent) => {
        if (this.props.existingEntry) {
            await editEntry(this.state.entryDate, this.state.entryName, this.state.entryDescription, this.props.existingEntry.id);
        } else {
            await createEntry(this.state.entryDate, this.state.entryName, this.state.entryDescription, this.props.tripId);
        }
        this.props.onUpsert();
        this.setState({ show: false });
    }


    

    handleChangeEntryDate(e: ChangeEvent<HTMLInputElement>){
        this.setState({
            entryDate: e.target.value,
        })
    }

    handleChangeEntryName(e: ChangeEvent<HTMLInputElement>){
        this.setState({
            entryName: e.target.value,
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

    getButton() {
        if (this.props.existingEntry) {
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
                        <h1>{this.props.existingEntry ? 'Edit Entry' : 'New Entry'}</h1>
                    <form>
                    <TextField value={this.state.entryDate} label="entryDate" variant="outlined" onChange={this.handleChangeEntryDate.bind(this)}/>
                    <br />
                    <TextField value={this.state.entryName} label="entryName" variant="outlined" onChange={this.handleChangeEntryName.bind(this)}/>
                    <br />
                    <TextField value={this.state.entryDescription} label="entryDescription" variant="outlined" onChange={this.handleChangeEntryDescription.bind(this)}/>
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

export default EntryUpsertComponent;