import APIURL from "../Helpers/environment";
import { Trip } from "../Types/Trip";

export async function getTrips(): Promise<Trip[]> {
    const token = localStorage.getItem('token');
    if (token === null) {
        throw new Error('Not Authenticated');
    }

    const response = await fetch(`${APIURL}/trip/my-trips`, {
        method: 'GET',
        headers: new Headers( {
            'Authorization': token,
          })
    })
    .then((res) => res.json());

    return response as Trip[];
}

export async function createTrip(tripName: string, tripDescription: string, tripDates: string) : Promise<void>{
    const token = localStorage.getItem('token');
    if (token === null) {
        throw new Error('Not Authenticated');
    } else {

    await fetch(`${APIURL}/trip/create`, {
        method: 'POST',
        body: JSON.stringify({
            tripName,
            tripDates,
            tripDescription
        }),
        headers: new Headers( {
            'Authorization': token,
                "Content-Type": "application/json",
          })
    });
    return;
    
    }
    
}

export async function editTrip(tripName: string, tripDescription: string, tripDates: string, tripId: number) : Promise<void>{
    const token = localStorage.getItem('token');
    if (token === null) {
        throw new Error('Not Authenticated');
    } else {

    await fetch(`${APIURL}/trip/update/${tripId}`, {
        method: 'PUT',
        body: JSON.stringify({
            tripName,
            tripDescription,
            tripDates,
            id: tripId,
        }),
        headers: new Headers( {
            'Authorization': token,
                "Content-Type": "application/json",
          })
    });
    return;
    
    }
    
}

export async function deleteTrip(tripId: number): Promise<void> {
    const token = localStorage.getItem('token');
    if (token === null) {
        throw new Error('Not Authenticated');
    }

    await fetch(`${APIURL}/trip/${tripId}`, {
        method: 'DELETE',
        headers: new Headers( {
            'Authorization': token,
          })
    });

    return;
}
