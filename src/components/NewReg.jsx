import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom"
import { db } from "../firebase";
import { ref, push } from "firebase/database";

function NewReg() {

    const navigate = useNavigate();

    const [creds, setCreds] = useState({
        username: "",
        email: "",
        password: "",
        phone: "",
    });

    function handleChange(event) {
        setCreds((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value
        }));
    }

    async function addUser() {
        try {
            await push(ref(db, "users"), {
                username: creds.username,
                email: creds.email,
                phone: creds.phone,
                password: creds.password
            });
            alert("User added successfully.")
        } catch (err) {
            console.log(err);
            alert("There was some problem tbh. Please try again...")
        }

        navigate("/login");
    }

    return (
        <div className="full">
            <div className="login-box">

                <div className="brand">
                    <span className="brand-name">Chat On Weeknd</span>
                </div>

                <div className="login-header">
                    <h1>Create account</h1>
                    <p className="login-subtitle">Join the conversation today</p>
                </div>

                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        name="username"
                        placeholder="Choose a username"
                        onChange={handleChange}
                    />
                </div>

                {/* <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="text"
                        name="email"
                        placeholder="Your email address"
                        onChange={handleChange}
                    />
                </div> */}
                {/* 
                <div className="input-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                        id="phone"
                        type="text"
                        name="phone"
                        placeholder="Your phone number"
                        onChange={handleChange}
                    />
                </div> */}

                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Create a password"
                        onChange={handleChange}
                    />
                </div>

                <div className="button-group">
                    <button className="btn-primary" onClick={addUser}>Create account</button>
                    <button className="btn-secondary" onClick={() => navigate("/login")}>
                        Already have one? <span>Log in</span>
                    </button>
                </div>

            </div>
        </div>
    );
}

export default NewReg;