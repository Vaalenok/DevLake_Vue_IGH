import axios from 'axios';

const url = "http://localhost:8000"

export async function getAllUsers() {
    try {
        const config = {
            headers: { },
            params: {
                skip: 0,
                limit: 10
            }
        };
        const response = await axios.get(url + "/users", config);
        console.log(response)
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
    }
}

export async function getUserById(user_id) {
    try {
        const response = await axios.get(`${url}users/${user_id}`);
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
    }
}

export async function getFeedback(user_id) {
    try {
        const response = await axios.get(`${url}users/${user_id}`);
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
    }
}
