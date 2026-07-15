import { useDispatch, useSelector } from "react-redux";

import { saveInteraction } from "../services/interactionService";
import { updateInteraction } from "../services/updateInteraction";

import { clearInteraction } from "../redux/interactionSlice";

export default function SaveButton({ refreshTable }) {

    const interaction = useSelector(
        (state) => state.interaction
    );

    const dispatch = useDispatch();

    async function handleSave() {

        try {

            let response;

            if (interaction.id) {

                response = await updateInteraction(
                    interaction.id,
                    interaction
                );

            }

            else {

                response = await saveInteraction(
                    interaction
                );

            }

            alert(response.message);

            dispatch(
                clearInteraction()
            );
            refreshTable();

        }

        catch (error) {

            console.error(error);

            alert("Unable to save interaction.");

        }

    }

    return (

        <div className="bg-white rounded-xl shadow-sm border p-4 flex justify-end">

            <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold"
            >

                {

                    interaction.id

                        ?

                        "Update Interaction"

                        :

                        "Save Interaction"

                }

            </button>

        </div>

    );

}