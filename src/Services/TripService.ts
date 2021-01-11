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