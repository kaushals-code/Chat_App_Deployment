import React, { useState, useEffect, useRef } from "react";
import { ref, onValue, get } from "firebase/database";
import { db } from "../../firebase";
import { getDBUser } from "../../Auth";
import { sendMessage } from "../../services/chatservice";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import ChatDate from "./ChatDate";

function Chat({ id }) {

    const [messages, setMessages] = useState([]);
    const [chatInfo, setChatInfo] = useState({ name: "", color: "" });
    const bottomRef = useRef(null);
    const uid = getDBUser();

    // Load chat metadata and resolve UID to username
    useEffect(() => {
        async function loadChatInfo() {
            const chatMetaSnap = await get(ref(db, `users/${uid}/userChats/${id}`));

            if (chatMetaSnap.exists()) {
                const data = chatMetaSnap.val();

                // Resolve the UID stored in "with" to an actual username
                const userSnap = await get(ref(db, `users/${data.with}/username`));
                const username = userSnap.exists() ? userSnap.val() : "Unknown";

                setChatInfo({
                    name: username,
                    color: data.chatcolor || "#ccc"
                });
            }
        }

        loadChatInfo();
    }, [id]);

    // Load messages in real time
    useEffect(() => {
        const msgsRef = ref(db, `chats/${id}/messages`);
        const unsub = onValue(msgsRef, (snapshot) => {
            if (!snapshot.exists()) {
                setMessages([]);
                return;
            }
            const data = snapshot.val();
            const arr = Object.entries(data).map(([msgId, msg]) => ({
                id: msgId,
                ...msg
            }));
            arr.sort((a, b) => a.time - b.time);
            setMessages(arr);
        });
        return () => unsub();
    }, [id]);

    // Auto scroll to bottom on new messages
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    async function handleSend(text) {
        if (!text.trim()) return;
        await sendMessage(id, text);
    }

    function formatTime(timestamp) {
        return new Date(timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        });
    }

    function formatDate(timestamp) {
        const d = new Date(timestamp);
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();
        return `${day}.${month}.${year}`;
    }

    return (
        <div className="chat-window">

            <ChatHeader name={chatInfo.name} color={chatInfo.color} />

            <div className="messages-area" id="messagesArea">
                {messages.map((msg, index) => {
                    const prev = messages[index - 1];
                    const showDate = !prev || formatDate(prev.time) !== formatDate(msg.time);

                    return (
                        <React.Fragment key={msg.id}>
                            {showDate && <ChatDate date={formatDate(msg.time)} />}
                            <ChatMessage
                                text={msg.text}
                                type={msg.sender === uid ? "out" : "in"}
                                time={formatTime(msg.time)}
                            />
                        </React.Fragment>
                    );
                })}
                <div ref={bottomRef} />
            </div>

            <div className="input-bar">
                <ChatInput updateMes={handleSend} />
            </div>

        </div>
    );
}

export default Chat;
