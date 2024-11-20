import $api from "../../../app/api/http";

// ��������� ��� ��� ������
interface ForgotPasswordRequest {
    email: string;
    clientUri: string;
}

// ������� ��� �������� ������
export const resetPassword = async (data: ForgotPasswordRequest): Promise<void> => {
    try {
        const response = await $api.post("/user/forgot-password", data);

        if (response.status !== 200) {
            throw new Error("�� ������� ������� ������. �������� ���.");
        }

        console.log("���� ��� �������� ������ ���������� �� �����.");
    } catch (err: any) {
        console.error("������� ��� �������� ������ �� �������� ������:", err);
        throw new Error("�� ������� ������� ������: " + err.message);
    }
};
