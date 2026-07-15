import api from "./api";

export const updateInteraction = async (id, interactionData) => {

    const response = await api.put(
        `/interactions/${id}`,
        interactionData
    );

    return response.data;

};