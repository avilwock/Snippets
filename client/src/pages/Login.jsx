import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import Button from "../components/Button/Button"
import styles from "../pages/Login.module.css"
import { FaLightbulb } from "react-icons/fa"


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        
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
    <div className={styles.login}>

    <FaLightbulb className={styles.logo} />
        <form onSubmit = {handleLogin}>
            <div className="inputs">
                <input
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    placeholder="Password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className={styles.buttons}>
                <Button type="submit">
                    Login
                </Button>

                <Button 
                type="button"
                onClick={() => navigate('/signup')}>
                    Sign Up
                </Button>
            </div>
        </form>
    </div>
);
}

export default Login;