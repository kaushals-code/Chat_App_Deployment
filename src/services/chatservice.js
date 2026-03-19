import { ref, set, get, push, update } from "firebase/database";
import { db } from "../firebase";
import { getDBUser } from "../Auth";

export function generateChatId(uid1, uid2) {
    return [uid1, uid2].sort().join("_");
}

export async function createChat(otherUid) {
    const currentUid = getDBUser();
    const chatId = generateChatId(currentUid, otherUid);
    const chatRef = ref(db, `chats/${chatId}`);
    const snap = await get(chatRef);

    if (!snap.exists()) {
        await set(chatRef, {
            participants: {
                [currentUid]: true,
                [otherUid]: true
            }
        });

        await set(ref(db, `users/${currentUid}/userChats/${chatId}`), {
            with: otherUid,
            lastMessage: "",
            timestamp: Date.now()
        });

        await set(ref(db, `users/${otherUid}/userChats/${chatId}`), {
            with: currentUid,
            lastMessage: "",
            timestamp: Date.now()
        });
    }

    return chatId;
}

export async function sendMessage(chatId, text) {
    const uid = getDBUser();

    // 1. Push the new message
    const msgRef = push(ref(db, `chats/${chatId}/messages`));
    await update(msgRef, {
        sender: uid,
        text,
        time: Date.now()
    });

    // 2. Update lastMessage for ALL participants, not just the sender
    const participantsSnap = await get(ref(db, `chats/${chatId}/participants`));

    if (participantsSnap.exists()) {
        const updates = {};

        Object.keys(participantsSnap.val()).forEach((participantUid) => {
            updates[`users/${participantUid}/userChats/${chatId}/lastMessage`] = text;
            updates[`users/${participantUid}/userChats/${chatId}/timestamp`] = Date.now();
        });

        await update(ref(db), updates);
    }
}