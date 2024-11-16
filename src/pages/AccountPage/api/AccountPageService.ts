import $api from "../../../app/api/http";

// Інтерфейси для відповіді API
export interface Post {
    postId: string;
    text: string;
}

export interface Comment {
    bookId: string;
    postId: string;
    title: string;
    commentId: string;
    content: string;
    dateTime: string;
}

export interface UserData {
    username: string;
    email: string;
    photo: string;
    posts: Post[];
    comments: Comment[];
}

// Функція для отримання даних користувача
export const getUserData = async (userId: string): Promise<UserData> => {
    try {
        //console.log("Запит на отримання даних користувача для ID:", userId); // Лог для дебагу

        // Використовуємо $api для отримання даних через API
        const response = await $api.get(`/user/${userId}`);

        if (response.status !== 200) {
            throw new Error("Не вдалося отримати дані користувача, помилка сервера.");
        }

        const data = response.data;  // API вже повертає об'єкт, тому потрібно тільки отримати дані
        //console.log("Дані користувача:", data); // Лог для перевірки

        return data;
    } catch (err: any) {
        console.error("Помилка при отриманні даних користувача:", err);
        throw new Error("Помилка при отриманні даних користувача: " + err.message);
    }
};
