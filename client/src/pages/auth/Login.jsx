import {useState} from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "Donor" // Default for testing
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        
        // Mock login and redirect
        if (formData.role === "Donor") {
            navigate("/donor/dashboard");
        } else {
            navigate("/ngo/dashboard");
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
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
                
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', marginBottom: '1rem', color: '#475569' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                        <input 
                            type="radio" 
                            name="role" 
                            value="Donor" 
                            checked={formData.role === "Donor"} 
                            onChange={handleChange} 
                        />
                        Donor
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                        <input 
                            type="radio" 
                            name="role" 
                            value="NGO" 
                            checked={formData.role === "NGO"} 
                            onChange={handleChange} 
                        />
                        NGO
                    </label>
                </div>

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;