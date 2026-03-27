import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("dashboard");
    const [isEditingProfile, setIsEditingProfile] = useState(false);
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

    const handleProfileSave = () => {
        setIsEditingProfile(false);
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
                            <p className="user-name">Donor User</p>
                            <p className="user-role">Food Donor</p>
                        </div>
                        <button className="logout-btn" title="Logout" onClick={() => navigate('/landing')}>
                            ⎋
                        </button>
                    </div>
                </div>
            </aside>

            <main className="main-content">
                <header className="dashboard-header">
                    <h1>Welcome back, Donor! 👋</h1>
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
                                <form className="dashboard-form">
                                    <div className="form-group">
                                        <label>Food Type</label>
                                        <input type="text" placeholder="e.g. Cooked Rice, Canned Beans" />
                                    </div>
                                    <div className="form-group">
                                        <label>Quantity</label>
                                        <input type="text" placeholder="e.g. 50 servings, 20 kg" />
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea placeholder="Brief description of the food items"></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label>Expiry Time</label>
                                        <input type="datetime-local" />
                                    </div>
                                    <div className="form-group">
                                        <label>Location</label>
                                        <input type="text" placeholder="Pickup location address" />
                                    </div>
                                    <button type="button" className="action-btn primary">Submit Donation</button>
                                </form>
                            </div>
                        </div>
                    )}
                    {activeTab === 'mydonations' && (
                        <div className="tab-content fade-in">
                            <h2>My Donations</h2>
                            <div className="card-list">
                                <div className="item-card">
                                    <h4>50 Meals to Hope NGO</h4>
                                    <p><strong>Food Type:</strong> Mixed Meals</p>
                                    <p><strong>Quantity:</strong> 50 servings</p>
                                    <p><strong>Status:</strong> <span className="status completed">Delivered</span></p>
                                    <p><strong>Date:</strong> Oct 24, 2023</p>
                                </div>
                                <div className="item-card">
                                    <h4>Winter Clothes Bundle</h4>
                                    <p><strong>Type:</strong> Clothing</p>
                                    <p><strong>Quantity:</strong> 3 boxes</p>
                                    <p><strong>Status:</strong> <span className="status pending">Pending Pickup</span></p>
                                    <p><strong>Date:</strong> Oct 26, 2023</p>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === 'requests' && (
                        <div className="tab-content fade-in">
                            <h2>NGO Requests</h2>
                            <div className="card-list">
                                <div className="item-card">
                                    <h4>Urgent: 100 Meals needed</h4>
                                    <p><strong>NGO:</strong> Sunshine Foundation</p>
                                    <p><strong>Location:</strong> Downtown Shelter</p>
                                    <button className="action-btn primary small">Fulfill Request</button>
                                </div>
                                <div className="item-card">
                                    <h4>Canned Food Drive</h4>
                                    <p><strong>NGO:</strong> Community Helpers</p>
                                    <p><strong>Location:</strong> Westside Center</p>
                                    <button className="action-btn primary small">Fulfill Request</button>
                                </div>
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
                                            <label style={{ display: 'block', fontSize: '0.9rem', color: '#64748b', marginBottom: '0.3rem', fontWeight: '600' }}>Full Name</label>
                                            <p style={{ margin: 0, fontSize: '1.1rem', color: '#1e293b' }}>{profileData.name}</p>
                                        </div>
                                        <div className="detail-group">
                                            <label style={{ display: 'block', fontSize: '0.9rem', color: '#64748b', marginBottom: '0.3rem', fontWeight: '600' }}>Role</label>
                                            <p style={{ margin: 0, fontSize: '1.1rem', color: '#1e293b' }}>{profileData.role}</p>
                                        </div>
                                        <div className="detail-group">
                                            <label style={{ display: 'block', fontSize: '0.9rem', color: '#64748b', marginBottom: '0.3rem', fontWeight: '600' }}>Phone Number</label>
                                            <p style={{ margin: 0, fontSize: '1.1rem', color: '#1e293b' }}>{profileData.phone}</p>
                                        </div>
                                        <div className="detail-group">
                                            <label style={{ display: 'block', fontSize: '0.9rem', color: '#64748b', marginBottom: '0.3rem', fontWeight: '600' }}>Address</label>
                                            <p style={{ margin: 0, fontSize: '1.1rem', color: '#1e293b' }}>{profileData.address}</p>
                                        </div>
                                        <div className="detail-group">
                                            <label style={{ display: 'block', fontSize: '0.9rem', color: '#64748b', marginBottom: '0.3rem', fontWeight: '600' }}>Email Address</label>
                                            <p style={{ margin: 0, fontSize: '1.1rem', color: '#1e293b' }}>{profileData.email}</p>
                                        </div>
                                        <div className="detail-group">
                                            <label style={{ display: 'block', fontSize: '0.9rem', color: '#64748b', marginBottom: '0.3rem', fontWeight: '600' }}>Password</label>
                                            <p style={{ margin: 0, fontSize: '1.1rem', color: '#1e293b' }}>••••••••</p>
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
                                            <input type="text" name="role" value={profileData.role} readOnly style={{backgroundColor: '#f1f5f9', cursor: 'not-allowed', color: '#64748b'}} />
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