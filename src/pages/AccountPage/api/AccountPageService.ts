import $api from "../../../app/api/http";

// ���������� ��� ������ API
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

// ������� ��� ��������� ����� �����������
export const getUserData = async (userId: string): Promise<UserData> => {
    try {
        //console.log("����� �� ��������� ����� ����������� ��� ID:", userId); // ��� ��� ������

        // ������������� $api ��� ��������� ����� ����� API
        const response = await $api.get(`/user/${userId}`);

        if (response.status !== 200) {
            throw new Error("�� ������� �������� ���� �����������, ������� �������.");
        }

        const data = response.data;  // API ��� ������� ��'���, ���� ������� ����� �������� ����
        //console.log("���� �����������:", data); // ��� ��� ��������

        return data;
    } catch (err: any) {
        console.error("������� ��� ��������� ����� �����������:", err);
        throw new Error("������� ��� ��������� ����� �����������: " + err.message);
    }
};
