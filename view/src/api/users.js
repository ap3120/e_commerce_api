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
    const session = await response.json();
    return session;
}

export const logoutUser = async () => {
    const response = await fetch(`${API_ENDPOINT}/logout`);
    const jsonResponse = await response.json();
    return jsonResponse;
}

export const updatePassword = async (id, password, newPassword) => {
    const response = await fetch(`${API_ENDPOINT}/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            password: password,
            newPassword: newPassword
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });
    const jsonResponse = await response.json();
    return jsonResponse;
}

export const deleteUser = async (id, password) => {
    const response = await fetch(`${API_ENDPOINT}/users/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({
            password: password
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });
    const jsonResponse = await response.json();
    return jsonResponse;
}
