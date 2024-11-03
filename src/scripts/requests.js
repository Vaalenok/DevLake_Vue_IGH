import axios from 'axios';

const url = 'http://localhost:8000'

export async function getAllUsers() {
    try {
        return (await axios.get(url + '/users')).data;
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
