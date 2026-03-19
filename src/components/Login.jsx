import React, { useState } from "react";
import "./Login.css";
import { setDBUser } from "../Auth";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { ref, query, orderByChild, equalTo, get } from "firebase/database";

function Login() {

    const navigate = useNavigate();

    const [creds, changeCreds] = useState({
        username: "",
        password: ""
    });

    function handleChange(event) {

        changeCreds((prev) => ({
            ...prev,
            [event.target.name]: event.target.value
        }));

    }

    async function handleLogin(e) {

        e.preventDefault();

        const q = query(
            ref(db, "users"),
            orderByChild("username"),
            equalTo(creds.username)
        );

        const snapshot = await get(q);

        if (!snapshot.exists()) {
            alert("User not found");
            return;
        }

        const users = snapshot.val();

        for (const [uid, user] of Object.entries(users)) {

            if (user.password === creds.password) {

                setDBUser(uid);

                console.log("Logged in UID:", uid);

                navigate("/dashboard");

                return;
            }
        }

        alert("Wrong password");
    }

    return (
        <div className="full">
            <div className="login-box">
                <h1>Login here</h1>

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={creds.username}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={creds.password}
                    onChange={handleChange}
                />

                <button onClick={handleLogin}>Log in!</button>

                <button onClick={() => navigate("/newreg")}>
                    New? Sign up!
                </button>

            </div>
        </div>
    );
}

export default Login;