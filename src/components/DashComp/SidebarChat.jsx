import React from "react";

function SidebarChat(props) {

    function formatTime(timestamp) {
        if (!timestamp) return "";
        const d = new Date(timestamp);
        return d.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        });
    }

    return (
        <>
            <div className={`chat-item ${props.active ? "active" : ""}`} onClick={props.onClick}>
                <div className="avatar" style={{ background: props.color }}>
                    {props.name
                        ? props.name.replace(/[^\w\s]/gi, '').trim().split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
                        : "??"
                    }
                </div>
                <div className="chat-info">
                    <div className="chat-top">
                        <span className="chat-name">{props.name || "Unknown"}</span>
                        <span className="chat-time">{formatTime(props.time)}</span>
                    </div>
                    <div className="chat-bottom">
                        <span className="chat-preview">{props.preview}</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SidebarChat;