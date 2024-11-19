import $api from "../../../app/api/http";

// Інтерфейс для параметрів запиту
interface ResetPasswordParams {
    password: string;
    confirmPassword: string;
    email: string;
    token: string;
}

// Функція для зміни пароля
export const resetUserPassword = async (params: ResetPasswordParams): Promise<void> => {
    try {
        const response = await $api.post('/user/reset-user-password', params, {
            headers: {
                Authorization: `Bearer ${params.token}`, // Додамо правильний заголовок з токеном
                'Content-Type': 'application/json'
            }
        });

        if (response.status !== 200) {
            throw new Error('Помилка сервера. Спробуйте пізніше.');
        }
    } catch (error: any) {
        console.error('Помилка при зміні пароля:', error);
        throw new Error(error.response?.data?.message || 'Не вдалося змінити пароль.');
    }
};
