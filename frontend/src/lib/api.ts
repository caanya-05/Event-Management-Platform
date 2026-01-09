export interface EventType {
  title: string;
  description: string;
  date: string;
  location: string;
  image?: string;
  organizer?: string;
  seats?: number;
}


import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getEvents = async () => {
  const response = await api.get("/events");
  return response.data;
};

export const createEvent = async (eventData: any) => {
  const response = await api.post("/events", eventData);
  return response.data;
};

export default api;


