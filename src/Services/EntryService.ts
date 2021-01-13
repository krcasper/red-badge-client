import APIURL from "../Helpers/environment";
import { Entry } from "../Types/Entry";

export async function getEntries(tripId: number): Promise<Entry[]> {
    const token = localStorage.getItem('token');
    if (token === null) {
        throw new Error('Not Authenticated');
    }

    const response = await fetch(`${APIURL}/trip/${tripId}/entries`, {
        method: 'GET',
        headers: new Headers( {
            'Authorization': token,
          })
    })
    .then((res) => res.json());

    return response as Entry[];
}

export async function deleteEntry(entryId: number): Promise<void> {
    const token = localStorage.getItem('token');
    if (token === null) {
        throw new Error('Not Authenticated');
    }

    await fetch(`${APIURL}/entry/${entryId}`, {
        method: 'DELETE',
        headers: new Headers( {
            'Authorization': token,
          })
    });

    return;
}



export async function createEntry(entryDate: string, entryName: string, entryDescription: string, tripId: number) : Promise<void>{
    const token = localStorage.getItem('token');
    if (token === null) {
        throw new Error('Not Authenticated');
    } else {

    await fetch(`${APIURL}/trip/${tripId}/new-entry`, {
        method: 'POST',
        body: JSON.stringify({
            entryDate,
            entryName,
            entryDescription,
        }),
        headers: new Headers( {
            'Authorization': token,
                "Content-Type": "application/json",
          })
    });
    return;
    
    }
    
}

export async function editEntry(entryDate: string, entryName: string, entryDescription: string, entryId: number) : Promise<void>{
    const token = localStorage.getItem('token');
    if (token === null) {
        throw new Error('Not Authenticated');
    } else {

    await fetch(`${APIURL}/entry/update/${entryId}`, {
        method: 'PUT',
        body: JSON.stringify({
            entryDate,
            entryName,
            entryDescription,
            id: entryId,
        }),
        headers: new Headers( {
            'Authorization': token,
                "Content-Type": "application/json",
          })
    });
    return;
    
    }
    
}