import { useState } from "react";
import { useDispatch } from "react-redux";
import api from "../services/api";
import { updateMultipleFields } from "../redux/interactionSlice";
import MessageBubble from "./MessageBubble";

export default function ChatPanel() {

    const dispatch = useDispatch();

    const [message, setMessage] = useState("");

    const [messages, setMessages] = useState([
        {
            sender: "assistant",
            message: "👋 Hello! Tell me about today's HCP interaction."
        }
    ]);

    async function sendMessage() {

        if (!message.trim()) return;

        const userMessage = message;

        // Add user message
        setMessages(prev => [
            ...prev,
            {
                sender: "user",
                message: userMessage
            }
        ]);

        setMessage("");

        try {

            const response = await api.post("/chat", {
                message: userMessage
            });

            // ******** DEBUG ********
            console.log("========== BACKEND RESPONSE ==========");
            console.log(response.data);
            console.log("======================================");
            // ************************

            // Show assistant reply
            setMessages(prev => [
                ...prev,
                {
                    sender: "assistant",
                    message:
                        response.data.reply ||
                        "Done."
                }
            ]);

            // Update Redux
            if (response.data.data) {

                console.log("Updating Redux with:");

                console.log(response.data.data);

                dispatch(
                    updateMultipleFields(
                        response.data.data
                    )
                );

            }

        } catch (error) {

            console.error("Chat Error:");

            console.error(error);

            setMessages(prev => [
                ...prev,
                {
                    sender: "assistant",
                    message: "❌ Backend not connected."
                }
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

                    Log interaction using natural language

                </p>

            </div>

            {/* Messages */}

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

                    Log

                </button>

            </div>

        </div>

    );

}