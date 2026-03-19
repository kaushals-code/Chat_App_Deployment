import React from "react";

function ChatHeader(props) {
    return (
        <>
            <div className="chat-header">
                <div
                    className="avatar"
                    id="chatAvatar"
                    style={{ fontSize: "16px", width: "40px", height: "40px", background: props.color }}
                >
                    {props.name
                        ? props.name.replace(/[^\w\s]/gi, '').trim().split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
                        : "??"
                    }
                </div>
                <div className="chat-header-info">
                    <div className="chat-header-name" id="chatName">{props.name || "Loading..."}</div>
                </div>
                <div className="chat-header-icons">
                    <button className="icon-btn" title="More options">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="12" cy="5" r="1.5" />
                            <circle cx="12" cy="12" r="1.5" />
                            <circle cx="12" cy="19" r="1.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    );
}

export default ChatHeader;