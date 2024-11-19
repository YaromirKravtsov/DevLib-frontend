import $api from "../../../app/api/http";

// Інтерфейс для тіла запиту
interface ForgotPasswordRequest {
    email: string;
    clientUri: string;
}

// Функція для скидання паролю
export const resetPassword = async (data: ForgotPasswordRequest): Promise<void> => {
    try {
        const response = await $api.post("/user/forgot-password", data);

        if (response.status !== 200) {
            throw new Error("Не вдалося скинути пароль. Перевірте дані.");
        }

        console.log("Лист для скидання паролю відправлено на пошту.");
    } catch (err: any) {
        console.error("Помилка при відправці запиту на скидання паролю:", err);
        throw new Error("Не вдалося скинути пароль: " + err.message);
    }
};
