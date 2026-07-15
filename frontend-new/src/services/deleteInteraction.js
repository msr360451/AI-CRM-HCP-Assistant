import api from "./api";

export const deleteInteraction = async (id) => {

    const response = await api.delete(
        `/interactions/${id}`
    );

    return response.data;

};