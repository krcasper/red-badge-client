import APIURL from '../Helpers/environment';
import {User} from '../Types/User';

export async function getMyUser(token: string): Promise<User> {
    if (token === null) {
        throw new Error('Not Authenticated');
    }

    const response = await fetch(`${APIURL}/users/my-user`, {
        method: 'GET',
        headers: new Headers( {
            'Authorization': token,
          })
    })
    .then((res) => res.json());

    return response as User;
}