import api from "./api";

export const getInteractions = async () => {
    const response = await api.get("/interactions");
    return response.data;
};