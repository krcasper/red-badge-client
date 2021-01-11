import APIURL from '../Helpers/environment';

export async function Register(email: string, username: string, password: string) {
    const response = await fetch(`${APIURL}/users/register`, {
        method: 'POST',
        body: JSON.stringify({
            email,
            username,
            password,
        }),
        headers: {
            "Content-Type": "application/json",
          }
    })
    .then((res) => res.json());

    localStorage.setItem('token', response.sessionToken);

    return response.sessionToken;
    
}