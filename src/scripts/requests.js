import axios from 'axios';

const url = 'http://localhost:8000/';

// Получить всех пользователей
export async function getAllUsers(skip = 0, limit = 10) {
    try {
        const response = await axios.get(`${url}users`, {
            params: { skip, limit }
        });
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        throw error;
    }
}

// Получить пользователя по id
export async function getUserById(user_id) {
    try {
        return (await axios.get(`${url}users/${user_id}`)).data;
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        throw error;
    }
}

// Получить отзывы по id пользователя
export async function getFeedback(userId, skip = 0, limit = 10) {
    try {
        return (await axios.get(`${url}feedbacks`, {
            params: {
                user_id: userId,
                skip,
                limit,
            }
        })).data;
    } catch (error) {
        console.error("Ошибка при получении отзывов:", error);
        return [];
    }
}