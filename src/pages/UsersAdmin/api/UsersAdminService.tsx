import $api from "../../../app/api/http";

// ���������� ��� ������������
export interface User {
    id: string;
    username: string;
    photo: string;
    isBanned: boolean;
    isModerator: boolean;
}

// ��������� ������ ������������
export const getUsers = async (): Promise<User[]> => {
    try {
        const response = await $api.get("/admin/user");
        if (response.status !== 200) {
            throw new Error("�� ������� �������� ������ ������������.");
        }
        return response.data;
    } catch (err: any) {
        console.error("������� ��� �������� ������������:", err);
        throw new Error("������� ��� �������� ������������: " + err.message);
    }
};

// ������� ���� ���������� ������������
export const assignModeratorRole = async (userId: string) => {
    try {
        const response = await $api.post(`/admin/assign-moderator-role`, { userId });
        if (response.status !== 200) {
            throw new Error("�� ������� ���������� ����������.");
        }
    } catch (err: any) {
        console.error("������� ��� ������ ���� ����������:", err);
        throw new Error("������� ��� ������ ���� ����������: " + err.message);
    }
};

// ���������� �����������
export const banUser = async (userId: string, isBanned: boolean) => {
    try {
        // ��������� ����� �������
        console.log("Making request to ban userId:", userId, "isBanned:", isBanned);
        const response = await $api.post(`/admin/ban/${userId}`, null, {
            params: { isBanned }
        });
        if (response.status !== 200) {
            throw new Error("�� ������� ����������� �����������.");
        }
    } catch (err: any) {
        console.error("������� ��� ��������� �����������:", err);
        throw new Error("������� ��� ��������� �����������: " + err.message);
    }
};
