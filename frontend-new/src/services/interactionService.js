import api from "./api";

export const saveInteraction = async (interactionData) => {
    console.log("Calling:", "/interactions/interaction");

    const response = await api.post(
        "/interactions/interaction",
        interactionData
    );

    return response.data;
};