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
                <div className="brand">
                    <span className="brand-name">Chat On Weeknd</span>
                </div>

                <div className="login-header">
                    <h1>Welcome back</h1>
                    <p className="login-subtitle">Sign in to continue</p>
                </div>

                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        name="username"
                        placeholder="Enter your username"
                        value={creds.username}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={creds.password}
                        onChange={handleChange}
                    />
                </div>

                <div className="button-group">
                    <button className="btn-primary" onClick={handleLogin}>Log in</button>
                    <button className="btn-secondary" onClick={() => navigate("/newreg")}>
                        New here? <span>Sign up</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;