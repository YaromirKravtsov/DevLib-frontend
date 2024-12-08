import $api from "../../../app/api/http";

// Типи для постів і коментарів
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
        console.log("Fetching data for userId:", userId);

        const response = await $api.get(`/user/${userId}`);
        if (response.status !== 200) {
            throw new Error("Не вдалося отримати дані користувача.");
        }

        console.log("User data fetched:", response.data);
        return response.data;
    } catch (err: any) {
        console.error("Error fetching user data:", err);
        throw new Error("Помилка при отриманні даних користувача: " + err.message);
    }
};
