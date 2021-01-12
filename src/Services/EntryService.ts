import APIURL from "../Helpers/environment";
import { Entry } from "../Types/Entry";

export async function getEntries(): Promise<Entry[]> {
    const token = localStorage.getItem('token');
    if (token === null) {
        throw new Error('Not Authenticated');
    }

    const response = await fetch(`${APIURL}/trip/1/entries`, {
        method: 'GET',
        headers: new Headers( {
            'Authorization': token,
          })
    })
    .then((res) => res.json());

    return response as Entry[];
}