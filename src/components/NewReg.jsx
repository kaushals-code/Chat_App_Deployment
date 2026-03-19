import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom"
import { db } from "../firebase";
import { ref, set, push } from "firebase/database";

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
            alert("Ther was some problem tbh. Please try again...")
        }

        navigate("/login");
    }

    return (
        <>
            <div className="full">
                <div className="login-box">
                    <h1>Register here</h1>
                    <input type="text" name="username" placeholder="Username" onChange={handleChange} />
                    <input type="text" name="email" placeholder="Email" onChange={handleChange} />
                    <input type="text" name="phone" placeholder="Phone" onChange={handleChange} />
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                    <button onClick={addUser} >Sign up!</button>
                </div>
            </div>
        </>
    );
}

export default NewReg;