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