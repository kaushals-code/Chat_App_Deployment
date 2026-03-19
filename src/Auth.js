// Auth.js

let dbUser = null;

export function setDBUser(uid) {

    dbUser = uid;

    localStorage.setItem("uid", uid);

}

export function getDBUser() {

    if (dbUser) return dbUser;

    const stored = localStorage.getItem("uid");

    if (stored) {
        dbUser = stored;
        return stored;
    }

    return null;
}

export function logout() {

    dbUser = null;

    localStorage.removeItem("uid");

}