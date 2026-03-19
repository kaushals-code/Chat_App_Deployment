import React, { useState } from "react";

function ChatInput(props) {

    const [message, setMessage] = useState("");

    function handleSendMessage() {
        if (message !== "") {
            props.updateMes(message);
        }
        setMessage("");
    }

    function handleKey(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    }

    return (
        <>
            <div className="msg-input-wrap">
                <textarea
                    className="msg-input"
                    id="msgInput"
                    placeholder="Type a message"
                    rows="1"
                    onKeyDown={handleKey}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </div>
            <button
                className="send-btn"
                id="sendBtn"
                title="Send"
                onClick={handleSendMessage}
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
            </button>
        </>
    );
}

export default ChatInput;