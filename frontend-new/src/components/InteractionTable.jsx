import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { getInteractions } from "../services/getInteractions";
import { deleteInteraction } from "../services/deleteInteraction";

import { updateInteraction } from "../redux/interactionSlice";

export default function InteractionTable({ refresh }) {

    const [interactions, setInteractions] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        loadInteractions();
    }, [refresh]);

    async function loadInteractions() {
        try {
            const data = await getInteractions();
            setInteractions(data);
        } catch (err) {
            console.error("Error loading interactions:", err);
        }
    }

    function editInteraction(item) {

        dispatch(
            updateInteraction(item)
        );

        alert("Interaction loaded for editing.");

    }

    async function removeInteraction(id) {

        const ok = window.confirm(
            "Delete this interaction?"
        );

        if (!ok) return;

        try {

            const response = await deleteInteraction(id);

            alert(response.message);

            loadInteractions();

        }

        catch (err) {

            console.error(err);

            alert("Unable to delete interaction.");

        }

    }

    return (

        <div className="bg-white rounded-xl shadow border p-6 mt-6">

            <h2 className="text-xl font-semibold mb-4">
                Saved Interactions
            </h2>

            <table className="w-full border border-gray-300">

                <thead className="bg-gray-100">

                    <tr>
                        <th className="border p-2">ID</th>
                        <th className="border p-2">HCP Name</th>
                        <th className="border p-2">Type</th>
                        <th className="border p-2">Date</th>
                        <th className="border p-2">Time</th>
                        <th className="border p-2">Sentiment</th>
                        <th className="border p-2">Action</th>
                    </tr>

                </thead>

                <tbody>

                    {interactions.length === 0 ? (

                        <tr>
                            <td
                                colSpan="7"
                                className="text-center p-4"
                            >
                                No interactions found.
                            </td>
                        </tr>

                    ) : (

                        interactions.map((item) => (

                            <tr key={item.id}>

                                <td className="border p-2">
                                    {item.id}
                                </td>

                                <td className="border p-2">
                                    {item.hcpName}
                                </td>

                                <td className="border p-2">
                                    {item.interactionType}
                                </td>

                                <td className="border p-2">
                                    {item.date}
                                </td>

                                <td className="border p-2">
                                    {item.time}
                                </td>

                                <td className="border p-2">
                                    {item.sentiment}
                                </td>

                                <td className="border p-2">

                                    <div className="flex gap-2">

                                        <button
                                            onClick={() => editInteraction(item)}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => removeInteraction(item.id)}
                                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>

        </div>

    );

}