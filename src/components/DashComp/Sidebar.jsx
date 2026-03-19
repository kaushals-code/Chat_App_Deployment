import React, { useEffect, useState, useMemo } from "react";
import { ref, get } from "firebase/database";
import { db } from "../../firebase";
import { getDBUser } from "../../Auth";
import { createChat } from "../../services/chatService";

import SidebarHeader from "./SidebarHeader";
import SidebarSearch from "./SidebarSearch";
import SidebarChat from "./SidebarChat";
import avatarColors from "../../AvatarColors";

function Sidebar(props) {
    const [chats, setChats] = useState([]);
    const [curChat, setCurChat] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [availableUsers, setAvailableUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(false);

    async function loadChats() {
        const uid = getDBUser();
        const snapshot = await get(ref(db, `users/${uid}/userChats`));

        if (!snapshot.exists()) {
            setChats([]);
            return;
        }

        const data = snapshot.val();

        // For each chat, resolve the UID in "with" to an actual username
        const arr = await Promise.all(
            Object.entries(data).map(async ([id, chat]) => {
                const userSnap = await get(ref(db, `users/${chat.with}/username`));
                const username = userSnap.exists() ? userSnap.val() : "Unknown";
                return {
                    id,
                    ...chat,
                    withUid: chat.with,      // keep original UID for logic
                    with: username           // replace UID with readable name
                };
            })
        );

        setChats(arr);
    }

    useEffect(() => {
        loadChats();
    }, []);

    const colorMap = useMemo(() => {
        const map = {};
        chats.forEach((chat) => {
            map[chat.id] =
                chat.chatcolor !== "none" && chat.chatcolor
                    ? chat.chatcolor
                    : avatarColors[Math.floor(Math.random() * avatarColors.length)];
        });
        return map;
    }, [chats]);

    function handleOpenChat(id) {
        const chat = chats.find((c) => c.id === id);
        setCurChat(chat);
        props.onClick(id);
    }

    async function handleOpenNewChat() {
        setShowModal(true);
        setLoadingUsers(true);

        const uid = getDBUser();

        const allUsersSnap = await get(ref(db, "users"));
        if (!allUsersSnap.exists()) {
            setAvailableUsers([]);
            setLoadingUsers(false);
            return;
        }

        const allUsers = allUsersSnap.val();

        const existingChatSnap = await get(ref(db, `users/${uid}/userChats`));
        const existingChats = existingChatSnap.exists() ? existingChatSnap.val() : {};

        // Use withUid if resolved, fallback to with
        const alreadyChattingWith = new Set(
            Object.values(existingChats).map((c) => c.with)
        );

        const filtered = Object.entries(allUsers)
            .filter(([id]) => id !== uid && !alreadyChattingWith.has(id))
            .map(([id, user]) => ({
                id,
                username: user.username || "Unknown"
            }));

        setAvailableUsers(filtered);
        setLoadingUsers(false);
    }

    async function handleStartChat(otherUid) {
        const chatId = await createChat(otherUid);
        setShowModal(false);
        await loadChats();
        props.onClick(chatId);
    }

    return (
        <div className="sidebar">

            <SidebarHeader onNewChat={handleOpenNewChat} />
            <SidebarSearch />

            <div className="chat-list">
                {chats.map((chat) => (
                    <SidebarChat
                        key={chat.id}
                        name={chat.with}
                        preview={chat.lastMessage}
                        time={chat.timestamp}
                        onClick={() => handleOpenChat(chat.id)}
                        color={colorMap[chat.id]}
                        active={chat.id === curChat?.id}
                    />
                ))}
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-box" onClick={(e) => e.stopPropagation()}>

                        <div className="modal-header">
                            <h3>New Chat</h3>
                            <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
                        </div>

                        <div className="modal-body">
                            {loadingUsers ? (
                                <p className="modal-status">Loading users...</p>
                            ) : availableUsers.length === 0 ? (
                                <p className="modal-status">No new users to chat with</p>
                            ) : (
                                availableUsers.map((user) => (
                                    <div
                                        key={user.id}
                                        className="modal-user-item"
                                        onClick={() => handleStartChat(user.id)}
                                    >
                                        <div
                                            className="avatar"
                                            style={{ background: avatarColors[Math.floor(Math.random() * avatarColors.length)] }}
                                        >
                                            {user.username
                                                .replace(/[^\w\s]/gi, '')
                                                .trim()
                                                .split(' ')
                                                .map(w => w[0])
                                                .join('')
                                                .slice(0, 2)
                                                .toUpperCase()
                                            }
                                        </div>
                                        <span className="modal-username">{user.username}</span>
                                    </div>
                                ))
                            )}
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}

export default Sidebar;