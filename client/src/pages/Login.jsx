import { useState } from "react";
import api from "../api/api";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const response = await api.post("/user/login", {
            email,
            password
        });

        localStorage.setItem("token", response.data.token);

        console.log(response.data);
    };

    return (
        <>
            <input 
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleLogin}>
                Login
            </button>
        </>
    );
}

export default Login;