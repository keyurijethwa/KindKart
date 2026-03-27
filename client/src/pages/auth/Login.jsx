import {useState} from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        
        try {
            const res = await axios.post("http://localhost:8000/api/auth/login", {
                email: formData.email,
                password: formData.password
            });
            console.log("Hello");
            
            const user = res.data.user;
            console.log(user);
            
            // Store token and user data
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(user));

            if (user.role === "DONOR") {
                navigate("/donor/dashboard");
            } else if (user.role === "NGO") {
                navigate("/ngo/dashboard");
            } else if (user.role === "Admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Login failed. Please try again.");
            console.error("Login error:", err);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                {error && <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>}
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    required 
                />

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
