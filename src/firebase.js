import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyC3Ct5MXfUuSJLGfd0vwW9dnx3JwAf3mV8",
    authDomain: "test-learn-73ba9.firebaseapp.com",
    databaseURL: "https://test-learn-73ba9-default-rtdb.firebaseio.com",
    projectId: "test-learn-73ba9",
    storageBucket: "test-learn-73ba9.firebasestorage.app",
    messagingSenderId: "700456625903",
    appId: "1:700456625903:web:82e9f3dc5436f337d29d1a",
    measurementId: "G-C7Y7P86Q7B",
    databaseURL: "https://test-learn-73ba9-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);