import React from "react";

function EmptyState() {
    return (
        <div className="empty-state" id="emptyState">
            <div className="empty-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
            </div>
            <div className="empty-title">ChatApp Web</div>
            <div className="lock-row">
            </div>
        </div>
    );
}

export default EmptyState;