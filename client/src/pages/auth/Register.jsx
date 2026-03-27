import {useState} from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        phone: "",
        address: "",
        email: "",
        password: "",
        confirmPassword: "",
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
        
        if (!formData.role) {
            alert("Please tell us if you are a Donor or an NGO.");
            return;
        }
        
        // Mock auth redirect
        if (formData.role === "Donor") {
            navigate("/donor/dashboard");
        } else if (formData.role === "NGO") {
            navigate("/ngo/dashboard");
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} style={{ margin: '2rem 0' }}>
                <h2>Register</h2>
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                />
                
                {/* Radio buttons for Role */}
                <div className="radio-group" style={{ display: 'flex', gap: '2rem', padding: '0.5rem 0.2rem', color: '#475569' }}>
                    <span style={{ fontWeight: 600 }}>I am a:</span>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input 
                            type="radio" 
                            name="role" 
                            value="Donor" 
                            checked={formData.role === "Donor"} 
                            onChange={handleChange} 
                            required 
                            style={{ width: 'auto', padding: 0 }}
                        />
                        Food Donor
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input 
                            type="radio" 
                            name="role" 
                            value="NGO" 
                            checked={formData.role === "NGO"} 
                            onChange={handleChange} 
                            required 
                            style={{ width: 'auto', padding: 0 }}
                        />
                        NGO
                    </label>
                </div>

                <input 
                    type="text" 
                    name="phone" 
                    placeholder="Phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="text" 
                    name="address" 
                    placeholder="Address" 
                    value={formData.address} 
                    onChange={handleChange} 
                    required 
                />
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
                <button type="submit">Create Account</button>
            </form>
        </div>
    );
};

export default Register;