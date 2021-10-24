import axios from "axios";

const API_URL = `http://localhost:3000/api/v1/todo`;

export async function getTodo() {
    try {
        const response: any = await axios.get(`${API_URL}`);
        return response.data.todos;
    } catch (error) {
        console.error('getTodo>>> error',error);
    }
}

export async function creatTodo(data: any) {
    try {
        const response: any = await axios.post(`${API_URL}`, data);
        return response.data.todos;
    } catch (error) {
        console.error('getTodo>>> error',error);
    }
}

export async function deleteTodo(id: string) {
    try {
        const response: any = await axios.delete(`${API_URL}/${id}`);
        return response.data.todos;
    } catch (error) {
        console.error('getTodo>>> error',error);
    }
}

export async function updateTodo(id: string, data: any) {
    try {
        const response: any = await axios.patch(`${API_URL}/${id}`, data);
        return response.data.todos;
    } catch (error) {
        console.error('getTodo>>> error',error);
    }
}
