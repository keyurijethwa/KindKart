import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("dashboard");
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [donationForm, setDonationForm] = useState({
        foodType: "",
        quantity: "",
        description: "",
        expiryTime: "",
        location: ""
    });
    const [myDonations, setMyDonations] = useState([]);
    const [ngoRequests, setNgoRequests] = useState([]);
    const [profileData, setProfileData] = useState({
        name: "Donor User",
        role: "Food Donor",
        phone: "+1 234 567 8900",
        address: "123 Kindness Street, City",
        email: "donor@example.com",
        password: "password123"
    });

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:8000/api/profile", {
                headers: { Authorization: `Bearer ${token}` }
            });
            const userData = res.data.user;
            setProfileData(prev => ({ 
                ...prev, 
                name: userData.name, 
                email: userData.email, 
                role: userData.role, 
                phone: userData.phone || "", 
                address: userData.address || "" 
            }));
        } catch(e) {
            console.error("Failed to fetch profile", e);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    useEffect(() => {
        if (activeTab === 'mydonations') {
            fetchMyDonations();
        } else if (activeTab === 'requests') {
            fetchNgoRequests();
        }
    }, [activeTab]);

    const fetchMyDonations = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:8000/api/donor/my-donations", { headers: { Authorization: `Bearer ${token}` } });
            setMyDonations(res.data.donations || []);
        } catch (e) {
            console.error("Failed to fetch donations", e);
        }
    };

    const fetchNgoRequests = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:8000/api/donor/ngo-requests", { headers: { Authorization: `Bearer ${token}` } });
            setNgoRequests(res.data.requests || []);
        } catch (e) {
            console.error("Failed to fetch NGO requests", e);
        }
    };

    const handleProfileSave = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.put("http://localhost:8000/api/profile", {
                name: profileData.name,
                phone: profileData.phone,
                address: profileData.address
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Profile updated successfully!");
            setIsEditingProfile(false);
        } catch(e) {
            console.error(e);
            alert("Failed to update profile");
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:8000/api/auth/logout");
        } catch (e) {
            console.error(e);
        }
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login", { replace: true });
    };

    const handleDonationChange = (e) => {
        setDonationForm({...donationForm, [e.target.name]: e.target.value});
    };

    const handleDonationSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.post(
                "http://localhost:8000/api/donor/request",
                donationForm,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert("Donation successfully sent to all NGOs!");
            setDonationForm({ foodType: "", quantity: "", description: "", expiryTime: "", location: "" });
            setActiveTab("mydonations");
        } catch (error) {
            alert(error.response?.data?.message || "Failed to create donation");
            console.error(error);
        }
    };

    return (
        <div className="donor-dashboard-container">
            <aside className="donor-sidebar">
                <div className="sidebar-top">
                    <h2 className="logo">
                        <span className="logo-icon">✨</span> KindKart
                    </h2>
                    <nav className="menu">
                        <a className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
                             Dashboard
                        </a>
                        <a className={activeTab === 'createdonations' ? 'active' : ''} onClick={() => setActiveTab('createdonations')}>
                            Create Donation
                        </a>
                        <a className={activeTab === 'mydonations' ? 'active' : ''} onClick={() => setActiveTab('mydonations')}>
                            My Donations
                        </a>
                        <a className={activeTab === 'requests' ? 'active' : ''} onClick={() => setActiveTab('requests')}>
                            Requests
                        </a>
                    </nav>
                </div>

                <div className="sidebar-bottom">
                    <nav className="menu">
                        <a className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>
                            <i className="icon">👤</i> Profile
                        </a>

                    </nav>
                    <div className="user-info">
                        <div className="avatar">D</div>
                        <div className="user-details">
                            <p className="user-name">{profileData.name}</p>
                            <p className="user-role">{profileData.role}</p>
                        </div>
                        <button className="logout-btn" title="Logout" onClick={handleLogout}>
                            ⎋
                        </button>
                    </div>
                </div>
            </aside>

            <main className="main-content">
                <header className="dashboard-header">
                    <h1>Welcome back, {profileData.name}! 👋</h1>
                    <p className="subtitle">Here's an overview of your impact today.</p>
                </header>

                <div className="dashboard-scrollable-content">
                    {activeTab === 'dashboard' && (
                        <div className="tab-content fade-in">
                            <div className="stats-grid">
                                <div className="stat-card">
                                    <div className="stat-icon purple">🍽️</div>
                                    <div className="stat-info">
                                        <h3>Meals Provided</h3>
                                        <p className="stat-number">1,204</p>
                                    </div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-icon blue">📦</div>
                                    <div className="stat-info">
                                        <h3>Total Donations</h3>
                                        <p className="stat-number">42</p>
                                    </div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-icon pink">⭐</div>
                                    <div className="stat-info">
                                        <h3>Impact Score</h3>
                                        <p className="stat-number">850</p>
                                    </div>
                                </div>
                            </div>

                            <div className="dashboard-sections">
                                <div className="recent-activity section-card">
                                    <div className="section-header">
                                        <h2>Recent Activity</h2>
                                        <button className="view-all-btn">View All</button>
                                    </div>
                                    <ul className="activity-list">
                                        <li className="activity-item">
                                            <div className="activity-dot"></div>
                                            <div className="activity-details">
                                                <p className="activity-title">Donated 50 Meals to Hope NGO</p>
                                                <p className="activity-time">2 hours ago</p>
                                            </div>
                                            <span className="status completed">Completed</span>
                                        </li>
                                        <li className="activity-item">
                                            <div className="activity-dot pending"></div>
                                            <div className="activity-details">
                                                <p className="activity-title">Scheduled Pickup for Clothes</p>
                                                <p className="activity-time">Yesterday</p>
                                            </div>
                                            <span className="status pending">Pending</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="quick-actions section-card">
                                    <h2>Quick Actions</h2>
                                    <div className="action-buttons">
                                        <button className="action-btn primary" onClick={() => setActiveTab('createdonations')}>
                                            + New Donation
                                        </button>
                                        <button className="action-btn secondary">
                                            Browse NGOs
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === 'createdonations' && (
                        <div className="tab-content fade-in">
                            <div className="form-card">
                                <h2>Create Donation</h2>
                                <form className="dashboard-form" onSubmit={handleDonationSubmit}>
                                    <div className="form-group">
                                        <label>Food Type</label>
                                        <input type="text" name="foodType" placeholder="e.g. Cooked Rice, Canned Beans" value={donationForm.foodType} onChange={handleDonationChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Quantity</label>
                                        <input type="text" name="quantity" placeholder="e.g. 50 servings, 20 kg" value={donationForm.quantity} onChange={handleDonationChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea name="description" placeholder="Brief description of the food items" value={donationForm.description} onChange={handleDonationChange}></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label>Expiry Time</label>
                                        <input type="datetime-local" name="expiryTime" value={donationForm.expiryTime} onChange={handleDonationChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Location</label>
                                        <input type="text" name="location" placeholder="Pickup location address" value={donationForm.location} onChange={handleDonationChange} required />
                                    </div>
                                    <button type="submit" className="action-btn primary">Submit Donation</button>
                                </form>
                            </div>
                        </div>
                    )}
                    {activeTab === 'mydonations' && (
                        <div className="tab-content fade-in">
                            <h2>My Donations</h2>
                            <div className="card-list">
                                {myDonations.length === 0 ? (
                                    <p className="placeholder-text" style={{marginTop: '1rem'}}>No donations made yet.</p>
                                ) : (
                                    myDonations.map(don => (
                                        <div className="item-card" key={don.id}>
                                            <h4>{don.foodType}</h4>
                                            <p><strong>Quantity:</strong> {don.quantity}</p>
                                            <p><strong>Location:</strong> {don.location}</p>
                                            <p><strong>Status:</strong> <span className={`status completed`}>{don.status}</span></p>
                                            <p><strong>Expiry:</strong> {new Date(don.expiryTime).toLocaleString()}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                    {activeTab === 'requests' && (
                        <div className="tab-content fade-in">
                            <h2>NGO Requests</h2>
                            <div className="card-list">
                                {ngoRequests.length === 0 ? (
                                    <p className="placeholder-text" style={{marginTop: '1rem'}}>No requests from NGOs yet.</p>
                                ) : (
                                    ngoRequests.map(req => (
                                        <div className="item-card" key={req.id}>
                                            <h4>{req.title}</h4>
                                            <p><strong>NGO:</strong> {req.ngoName || "Unknown NGO"}</p>
                                            <p><strong>Description:</strong> {req.description}</p>
                                            <p><strong>Quantity Needed:</strong> {req.quantity}</p>
                                            <p><strong>Urgency:</strong> {req.urgency}</p>
                                            <button className="action-btn primary small" style={{marginTop:'0.5rem'}}>Fulfill Request</button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                    {activeTab === 'profile' && (
                        <div className="tab-content fade-in">
                            <div className="form-card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                    <h2 style={{ margin: 0 }}>Profile Information</h2>
                                    {!isEditingProfile && (
                                        <button 
                                            className="action-btn primary small" 
                                            onClick={() => setIsEditingProfile(true)}
                                            style={{ margin: 0 }}
                                        >
                                            Edit Profile
                                        </button>
                                    )}
                                </div>
                                
                                {!isEditingProfile ? (
                                    <div className="profile-details" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                        <div className="detail-group">
                                            <label style={{ display: 'block', fontSize: '0.9rem', color: '#6A9C89', marginBottom: '0.3rem', fontWeight: '600' }}>Full Name</label>
                                            <p style={{ margin: 0, fontSize: '1.1rem', color: '#16423C' }}>{profileData.name}</p>
                                        </div>
                                        <div className="detail-group">
                                            <label style={{ display: 'block', fontSize: '0.9rem', color: '#6A9C89', marginBottom: '0.3rem', fontWeight: '600' }}>Role</label>
                                            <p style={{ margin: 0, fontSize: '1.1rem', color: '#16423C' }}>{profileData.role}</p>
                                        </div>
                                        <div className="detail-group">
                                            <label style={{ display: 'block', fontSize: '0.9rem', color: '#6A9C89', marginBottom: '0.3rem', fontWeight: '600' }}>Phone Number</label>
                                            <p style={{ margin: 0, fontSize: '1.1rem', color: '#16423C' }}>{profileData.phone}</p>
                                        </div>
                                        <div className="detail-group">
                                            <label style={{ display: 'block', fontSize: '0.9rem', color: '#6A9C89', marginBottom: '0.3rem', fontWeight: '600' }}>Address</label>
                                            <p style={{ margin: 0, fontSize: '1.1rem', color: '#16423C' }}>{profileData.address}</p>
                                        </div>
                                        <div className="detail-group">
                                            <label style={{ display: 'block', fontSize: '0.9rem', color: '#6A9C89', marginBottom: '0.3rem', fontWeight: '600' }}>Email Address</label>
                                            <p style={{ margin: 0, fontSize: '1.1rem', color: '#16423C' }}>{profileData.email}</p>
                                        </div>
                                        <div className="detail-group">
                                            <label style={{ display: 'block', fontSize: '0.9rem', color: '#6A9C89', marginBottom: '0.3rem', fontWeight: '600' }}>Password</label>
                                            <p style={{ margin: 0, fontSize: '1.1rem', color: '#16423C' }}>••••••••</p>
                                        </div>
                                    </div>
                                ) : (
                                    <form className="dashboard-form">
                                        <div className="form-group">
                                            <label>Full Name</label>
                                            <input type="text" name="name" value={profileData.name} onChange={handleProfileChange} />
                                        </div>
                                        <div className="form-group">
                                            <label>Role</label>
                                            <input type="text" name="role" value={profileData.role} readOnly style={{backgroundColor: '#C4DAD2', cursor: 'not-allowed', color: '#6A9C89'}} />
                                        </div>
                                        <div className="form-group">
                                            <label>Phone Number</label>
                                            <input type="tel" name="phone" value={profileData.phone} onChange={handleProfileChange} />
                                        </div>
                                        <div className="form-group">
                                            <label>Address</label>
                                            <textarea name="address" value={profileData.address} onChange={handleProfileChange}></textarea>
                                        </div>
                                        <div className="form-group">
                                            <label>Email Address</label>
                                            <input type="email" name="email" value={profileData.email} onChange={handleProfileChange} />
                                        </div>
                                        <div className="form-group">
                                            <label>Password</label>
                                            <input type="password" name="password" value={profileData.password} onChange={handleProfileChange} />
                                        </div>
                                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                            <button type="button" className="action-btn primary" onClick={handleProfileSave}>Save Changes</button>
                                            <button type="button" className="action-btn secondary" onClick={() => setIsEditingProfile(false)}>Cancel</button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    )}
                    {activeTab === 'settings' && (
                        <div className="tab-content fade-in">
                            <div className="form-card">
                                <h2>Account Settings</h2>
                                <form className="dashboard-form">
                                    <div className="form-group">
                                        <label>Email Notifications</label>
                                        <select>
                                            <option>All notifications</option>
                                            <option>Important only</option>
                                            <option>None</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Privacy</label>
                                        <select>
                                            <option>Public Profile</option>
                                            <option>Private Profile</option>
                                        </select>
                                    </div>
                                    <button type="button" className="action-btn secondary">Update Settings</button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Dashboard;