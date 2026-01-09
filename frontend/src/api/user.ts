import axios from "axios";

const API = "http://localhost:5000/api/users";

export async function getUserProfile() {
    const res = await axios.get(`${API}/profile`);
    return res.data;
}

export async function updateUserProfile(data: any) {
    const res = await axios.put(`${API}/profile`, data);
    return res.data;
}
