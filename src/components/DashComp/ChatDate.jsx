import React from "react";

function ChatDate(props) {
    return (
        <>
            <div className="date-divider">
                <span className="date-label">{props.date}</span>
            </div>
        </>
    );
}

export default ChatDate;