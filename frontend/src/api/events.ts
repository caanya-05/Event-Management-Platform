import axios from "axios";

const API = "http://localhost:5000/api/events";

export async function getEvents() {
  const res = await axios.get(API);
  return res.data;
}

export async function createEvent(data: any) {
  const res = await axios.post(API, data);
  return res.data;
}

export async function deleteEvent(id: string) {
  const res = await axios.delete(`${API}/${id}`);
  return res.data;
}

export async function getSingleEvent(id: string) {
  const res = await axios.get(`${API}/${id}`);
  return res.data;
}
