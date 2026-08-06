import { useState } from "react";
import api from "../api/api";

function Signup() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async () => {

        try {
        const response = await api.post("/user/", {
            email,
            username,
            password
        });

        localStorage.setItem("token", response.data.token);

        console.log(response.data);

    } catch (error) {
        console.error("Signup failed:", error.response?.data || error.message);
    }
    };

    return (
        <>
            <input 
                placeholder="Email"
                value ={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                placeholder = "Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                placeholder="Password"
                value = {password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleSignup}>
                Signup
            </button>
        </>
    );
}

export default Signup;