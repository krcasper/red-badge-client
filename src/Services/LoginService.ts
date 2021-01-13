import APIURL from '../Helpers/environment';

export async function Login(username: string, password: string) {
    const response = await fetch(`${APIURL}/users/login`, {
        method: 'POST',
        body: JSON.stringify({
            username,
            password,
        }),
        headers: {
            "Content-Type": "application/json",
          }
    })
    .then((res) => res.json());
    if (!response.error) {
       
    }
    localStorage.setItem('token', response.sessionToken);

    return response.sessionToken;
    
}