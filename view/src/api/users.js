const API_ENDPOINT = 'http://localhost:3000';

export const registerUser = async (firstName, lastName, email, password) => {
    const response = await fetch(`${API_ENDPOINT}/register`, {
        method: 'POST',
        body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password
        }),
        headers: {
            "Content-Type": "application/json"
            //"Access-Control-Allow-Origin": "*",
            //"Access-Control-Allow-Credentials": true
        }
    });
    const newUser = await response.json();
    return newUser;
}

export const loginUser = async (username, password) => {
    const response = await fetch(`${API_ENDPOINT}/login`, {
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: password
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });
    console.log(`my response: ${response}`);
    const session = await response.json();
    return session;
}

