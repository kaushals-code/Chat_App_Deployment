import React from "react";

function SidebarSearch() {
    return (
        <div className="search-bar">
            <div className="search-input-wrap">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                </svg>
                <input className="search-input" type="text" placeholder="Search or start new chat" />
            </div>
        </div>
    );
}

export default SidebarSearch;