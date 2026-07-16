import { useState } from "react";
import { useDispatch , useSelector } from "react-redux";
import api from "../services/api";
import { updateMultipleFields } from "../redux/interactionSlice";
import MessageBubble from "./MessageBubble";

export default function ChatPanel() {

    const dispatch = useDispatch();
    const interaction = useSelector(
    (state) => state.interaction
);


    const [message, setMessage] = useState("");

    const [messages, setMessages] = useState([
        {
            sender: "assistant",
            message: "👋 Hello! I can help you log, edit, summarize, schedule follow-ups, and clear HCP interactions."
        }
    ]);

    async function sendMessage() {

        if (!message.trim()) return;

        const userMessage = message;

        // Add user message
        setMessages((prev) => [
            ...prev,
            {
                sender: "user",
                message: userMessage,
            },
        ]);

        setMessage("");

        try {

            const response = await api.post("/chat", {
    message: userMessage,
    interaction: interaction,
});

            console.log("========== BACKEND RESPONSE ==========");
            console.log(response.data);
            console.log("======================================");

            const tool = response.data.tool;

            let assistantMessage = response.data.reply || "Done.";

            // Show tool name along with response
            setMessages((prev) => [
                ...prev,
                {
                    sender: "assistant",
                    message:
                        `🛠 Tool Used: ${tool}\n\n${assistantMessage}`,
                },
            ]);

            // -----------------------------
            // Handle each LangGraph Tool
            // -----------------------------

            switch (tool) {

                case "log_interaction":

                    dispatch(
                        updateMultipleFields(
                            response.data.data
                        )
                    );

                    break;

                case "edit_interaction":

                    dispatch(
                        updateMultipleFields(
                            response.data.data
                        )
                    );

                    break;

                case "schedule_followup":

                    dispatch(
                        updateMultipleFields(
                            response.data.data
                        )
                    );

                    break;

                case "clear_interaction":

                    dispatch(
                        updateMultipleFields(
                            response.data.data
                        )
                    );

                    break;

                case "summarize_interaction":

                    // Summary is already shown in chat.
                    // No Redux update required.

                    break;

                default:

                    console.log("Unknown Tool");

            }

        } catch (error) {

            console.error(error);

            setMessages((prev) => [
                ...prev,
                {
                    sender: "assistant",
                    message: "❌ Unable to connect to backend.",
                },
            ]);

        }

    }

    return (

        <div className="bg-white rounded-xl border shadow-sm h-full flex flex-col">

            {/* Header */}

            <div className="border-b p-5">

                <h2 className="text-lg font-semibold">

                    🤖 AI Assistant

                </h2>

                <p className="text-sm text-gray-500">

                    Powered by LangGraph + Groq

                </p>

            </div>

            {/* Chat */}

            <div className="flex-1 overflow-y-auto p-4 space-y-3">

                {messages.map((item, index) => (

                    <MessageBubble
                        key={index}
                        sender={item.sender}
                        message={item.message}
                    />

                ))}

            </div>

            {/* Input */}

            <div className="border-t p-4 flex gap-2">

                <input

                    value={message}

                    onChange={(e) => setMessage(e.target.value)}

                    placeholder="Describe interaction..."

                    className="flex-1 border rounded-lg px-3 py-2"

                    onKeyDown={(e) => {

                        if (e.key === "Enter") {

                            sendMessage();

                        }

                    }}

                />

                <button

                    onClick={sendMessage}

                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-lg"

                >

                    Send

                </button>

            </div>

        </div>

    );

}