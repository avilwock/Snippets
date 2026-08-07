import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import Button from "../components/Button/Button"

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        
        try {
            const response = await api.post("/user/login", {
                email,
                password
            });

            localStorage.setItem("token", response.data.token);

            console.log(response.data);

            navigate ("/dashboard")
        } catch (error) {
            console.error(
                "Login failed:",
                error.response?.data || error.message
            )
        }
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

            <Button onClick={handleLogin}>
                Login
            </Button>
        </>
    );
}

export default Login;