import $api from "../../../app/api/http";

// ��������� ��� ��������� ������
interface ResetPasswordParams {
    password: string;
    confirmPassword: string;
    email: string;
    token: string;
}

// ������� ��� ���� ������
export const resetUserPassword = async (params: ResetPasswordParams): Promise<void> => {
    try {
        const response = await $api.post('/user/reset-user-password', params, {
            headers: {
                Authorization: `Bearer ${params.token}`, // ������ ���������� ��������� � �������
                'Content-Type': 'application/json'
            }
        });

        if (response.status !== 200) {
            throw new Error('������� �������. ��������� �����.');
        }
    } catch (error: any) {
        console.error('������� ��� ��� ������:', error);
        throw new Error(error.response?.data?.message || '�� ������� ������ ������.');
    }
};
