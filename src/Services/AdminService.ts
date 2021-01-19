import APIURL from "../Helpers/environment";
import { User } from "../Types/User";

export async function getUsers(): Promise<User[]> {
    const token = localStorage.getItem('token');
    if (token === null) {
        throw new Error('Not Authenticated');
    }

    const response = await fetch(`${APIURL}/users`, {
        method: 'GET',
        headers: new Headers( {
            'Authorization': token,
          })
    })
    .then((res) => res.json());

    return response as User[];
}

export async function editUsers(email: string, username: string, checkAdmin: boolean, id: number) : Promise<void>{
    const token = localStorage.getItem('token');
    if (token === null) {
        throw new Error('Not Authenticated');
    } else {

    await fetch(`${APIURL}/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            email,
            username,
            checkAdmin,
            id: id,
        }),
        headers: new Headers( {
            'Authorization': token,
                "Content-Type": "application/json",
          })
    });
    return;
    
    }  
}

export async function deleteUsers(id: number): Promise<void> {
    const token = localStorage.getItem('token');
    if (token === null) {
        throw new Error('Not Authenticated');
    }

    await fetch(`${APIURL}/users/${id}`, {
        method: 'DELETE',
        headers: new Headers( {
            'Authorization': token,
          })
    });

    return;
}





