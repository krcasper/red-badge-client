import APIURL from "../Helpers/environment";

export async function createTrip(tripName: string, tripDescription: string, tripMembers: string) : Promise<void>{
    const token = localStorage.getItem('token');
    if (token === null) {
        throw new Error('Not Authenticated');
    } else {

    await fetch(`${APIURL}/trip/create`, {
        method: 'POST',
        body: JSON.stringify({
            tripName,
            tripDescription,
            tripMembers,
        }),
        headers: new Headers( {
            'Authorization': token,
                "Content-Type": "application/json",
          })
    });
    return;
    
    }
    
}