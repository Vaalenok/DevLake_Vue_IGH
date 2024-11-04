import axios from 'axios';

const url = 'http://localhost:8000/'; // Базовый URL для вашего API

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
        return []; // Возвращаем пустой массив в случае ошибки
    }
}

// Функция для добавления отзыва
/**
 * @typedef {Object} Feedback
 * @property {string} userId - Идентификатор пользователя
 * @property {string} text - Текст отзыва
 * @property {Array.<{criteriaType: string, score: number}>} [scores] - Оценка по критериям (опционально)
 */

/**
 * Добавить отзыв для пользователя
 * @param {Feedback} feedback - Объект отзыва
 * @returns {Promise<Object>}
 */
export async function addFeedback(feedbackData) {
    try {
        // Создание объекта с данными отзыва
        const feedback = {
            feedback: feedbackData.feedback, // Переименование поля 'text' в 'feedback'
            reviewer_id: feedbackData.reviewer_id, // Переименование поля 'userId' в 'reviewer_id'
            under_reviewer_id: feedbackData.under_reviewer_id // ID лица, под чьим рецензированием
        };
        console.log(feedbackData);
        // Проверка на наличие всех обязательных полей
        if (!feedback.feedback || !feedback.reviewer_id || !feedback.under_reviewer_id) {
            throw new Error('Все поля (feedback, reviewer_id, under_reviewer_id) должны быть заполнены.');
        }

        // Запрос к серверу
        const response = await axios.post(`${url}feedbacks/create`, feedback, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('Отзыв успешно добавлен:', response.data); // Логирование успешного ответа
        return response.data; // Возвращаем данные ответа

    } catch (error) {
        if (error.response) {
            // Обработка ошибки ответа от сервера
            console.error(`Ошибка сервера: ${error.response.status}`);
            console.error('Детали ошибки:', error.response.data);

            // Вывод ошибок валидации
            if (Array.isArray(error.response.data)) {
                error.response.data.forEach(err => {
                    console.error(`Ошибка в поле: ${err.loc.join(' -> ')}. Сообщение: ${err.msg}`);
                });
            }

        } else if (error.request) {
            // Обработка ошибки отсутствия ответа от сервера
            console.error('Запрос был отправлен, но сервер не ответил:', error.request);

        } else {
            // Обработка остальных ошибок
            console.error('Произошла ошибка при настройке запроса:', error.message);
        }

        throw error; // Прокидываем ошибку для обработки на уровне вызова
    }
}


// Функция для получения общей оценки
/**
 * Получить средний рейтинг пользователя
 * @param {string} userId - Идентификатор пользователя
 * @returns {Promise<number>}
 */
export async function getUserScores(userId) {
    try {
        const response = await axios.get(`${url}users/${userId}/scores`);
        const data = response.data;

        // Предполагая, что API возвращает объект с необходимыми полями
        return {
            professionalism: data.professionalism,
            teamwork: data.teamwork,
            communication: data.communication,
            initiative: data.initiative
        };
    } catch (error) {
        console.error("Ошибка при получении оценок пользователя:", error);
        throw error;
    }
}