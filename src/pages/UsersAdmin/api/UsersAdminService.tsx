import $api from "../../../app/api/http";

// Інтерфейси для користувачів
export interface User {
    id: string;
    username: string;
    photo: string;
    isBanned: boolean;
    isModerator: boolean;
}

// Отримання списку користувачів
export const getUsers = async (): Promise<User[]> => {
    try {
        const response = await $api.get("/admin/user");
        if (response.status !== 200) {
            throw new Error("Не вдалося отримати список користувачів.");
        }
        return response.data;
    } catch (err: any) {
        console.error("Помилка при отриманні користувачів:", err);
        throw new Error("Помилка при отриманні користувачів: " + err.message);
    }
};

// Надання прав модератора користувачеві
export const assignModeratorRole = async (userId: string) => {
    try {
        const response = await $api.post(`/admin/assign-moderator-role`, { userId });
        if (response.status !== 200) {
            throw new Error("Не вдалося призначити модератора.");
        }
    } catch (err: any) {
        console.error("Помилка при наданні прав модератора:", err);
        throw new Error("Помилка при наданні прав модератора: " + err.message);
    }
};

// Блокування користувача
export const banUser = async (userId: string, isBanned: boolean) => {
    try {
        // Логування перед запитом
        console.log("Making request to ban userId:", userId, "isBanned:", isBanned);
        const response = await $api.post(`/admin/ban/${userId}`, null, {
            params: { isBanned }
        });
        if (response.status !== 200) {
            throw new Error("Не вдалося заблокувати користувача.");
        }
    } catch (err: any) {
        console.error("Помилка при блокуванні користувача:", err);
        throw new Error("Помилка при блокуванні користувача: " + err.message);
    }
};
