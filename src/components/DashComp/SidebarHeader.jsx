import React, { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { db } from "../../firebase";
import { getDBUser } from "../../Auth";
import avatarColors from "../../AvatarColors";

function SidebarHeader({ onNewChat }) {

    const [initials, setInitials] = useState("??");
    const [color] = useState(
        avatarColors[Math.floor(Math.random() * avatarColors.length)]
    );

    useEffect(() => {
        async function loadUser() {
            const uid = getDBUser();
            const snapshot = await get(ref(db, `users/${uid}`));
            if (snapshot.exists()) {
                const data = snapshot.val();
                const name = data.username || "";
                const ini = name
                    .replace(/[^\w\s]/gi, '')
                    .trim()
                    .split(' ')
                    .map(w => w[0])
                    .join('')
                    .slice(0, 2)
                    .toUpperCase();
                setInitials(ini || "??");
            }
        }
        loadUser();
    }, []);

    return (
        <div className="sidebar-header">
            <div className="user-avatar" title="Your profile" style={{ background: color }}>
                {initials}
            </div>
            <div className="header-icons">

                {/* New Chat button — calls onNewChat passed from Sidebar */}
                <button className="icon-btn" title="New chat" onClick={onNewChat}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                        strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        <line x1="12" y1="9" x2="12" y2="13" />
                        <line x1="10" y1="11" x2="14" y2="11" />
                    </svg>
                </button>

                <button className="icon-btn" title="Menu">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="5" r="1.5" />
                        <circle cx="12" cy="12" r="1.5" />
                        <circle cx="12" cy="19" r="1.5" />
                    </svg>
                </button>

            </div>
        </div>
    );
}

export default SidebarHeader;