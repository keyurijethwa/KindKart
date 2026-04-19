import React from 'react';
import { useNavigate } from 'react-router-dom';
import './landingpage.css';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-container">
            {/* Navbar  1 */}
            <nav style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '1rem 8%', background: '#fff',
                boxShadow: '0 2px 12px rgba(22,66,60,0.06)',
                position: 'sticky', top: 0, zIndex: 1000
            }}>
                <h2 style={{ color: '#16423C', fontWeight: 800, fontSize: '1.7rem', letterSpacing: '-1px', margin: 0, cursor: 'pointer' }}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    KindKart
                </h2>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                        style={{
                            padding: '10px 24px', borderRadius: '8px', border: '2px solid #6A9C89',
                            background: 'transparent', color: '#6A9C89', fontWeight: 600, fontSize: '0.95rem',
                            cursor: 'pointer', transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={e => { e.target.style.background = '#6A9C89'; e.target.style.color = '#fff'; }}
                        onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#6A9C89'; }}
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </button>
                    <button
                        style={{
                            padding: '10px 24px', borderRadius: '8px', border: 'none',
                            background: '#16423C', color: '#E9EFEC', fontWeight: 600, fontSize: '0.95rem',
                            cursor: 'pointer', boxShadow: '0 4px 12px rgba(22,66,60,0.2)',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={e => { e.target.style.background = '#6A9C89'; }}
                        onMouseLeave={e => { e.target.style.background = '#16423C'; }}
                        onClick={() => navigate('/register')}
                    >
                        Sign Up
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <header style={{
                textAlign: 'center', padding: '120px 8% 80px',
                background: 'linear-gradient(135deg, #E9EFEC 0%, #C4DAD2 100%)',
                position: 'relative'
            }}>
                <h1 style={{ fontSize: '3.2rem', fontWeight: 800, color: '#16423C', marginBottom: '1.5rem', lineHeight: 1.2 }}>
                    Bridge the gap between<br />
                    <span style={{ color: '#6A9C89' }}>surplus and scarcity.</span>
                </h1>
                <p style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto 2.5rem', color: '#6A9C89', lineHeight: 1.7 }}>
                    KindKart connects food donors with nearby NGOs in real-time, ensuring that extra meals reach those who need them most before time runs out.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    <button
                        style={{
                            padding: '16px 36px', fontSize: '1.1rem', fontWeight: 700,
                            background: '#16423C', color: '#fff', border: 'none', borderRadius: '50px',
                            cursor: 'pointer', boxShadow: '0 6px 20px rgba(22,66,60,0.25)',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={e => { e.target.style.background = '#6A9C89'; e.target.style.transform = 'translateY(-2px)'; }}
                        onMouseLeave={e => { e.target.style.background = '#16423C'; e.target.style.transform = 'translateY(0)'; }}
                        onClick={() => navigate('/register')}
                    >
                        Get Started Now
                    </button>
                    <button
                        style={{
                            padding: '16px 36px', fontSize: '1.1rem', fontWeight: 600,
                            background: '#fff', color: '#16423C', border: '2px solid #C4DAD2', borderRadius: '50px',
                            cursor: 'pointer', transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={e => { e.target.style.borderColor = '#6A9C89'; e.target.style.color = '#6A9C89'; }}
                        onMouseLeave={e => { e.target.style.borderColor = '#C4DAD2'; e.target.style.color = '#16423C'; }}
                        onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        Learn More
                    </button>
                </div>
            </header>

            {/* Features Section */}
            <section id="features" style={{ padding: '80px 8%', textAlign: 'center', background: '#fff' }}>
                <p style={{ color: '#6A9C89', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '1px' }}>Core Platform</p>
                <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#16423C', margin: '0.5rem 0 1rem' }}>Our Features</h2>
                <p style={{ fontSize: '1.1rem', color: '#6A9C89', maxWidth: '650px', margin: '0 auto 3rem' }}>
                    Everything you need to seamlessly coordinate food donations and drive real impact in your community.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    {[
                        { icon: '⏱️', title: 'Real-time meal tracking', desc: 'Monitor meal availability the exact moment surplus is posted. Map views and instant alerts make pickups remarkably efficient.' },
                        { icon: '💬', title: 'Seamless communication', desc: 'Direct messaging between donors and NGOs ensures logistics are smooth and any potential hiccups are resolved in seconds.' },
                        { icon: '📊', title: 'Impact tracking', desc: 'Visualize the profound difference you make with detailed reports on meals salvaged and carbon footprint effectively reduced.' }
                    ].map((f, i) => (
                        <div key={i} style={{
                            background: '#E9EFEC', borderRadius: '16px', padding: '2.5rem 2rem',
                            borderBottom: '4px solid #6A9C89',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease', cursor: 'default'
                        }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(22,66,60,0.1)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                        >
                            <div style={{
                                width: '52px', height: '52px', borderRadius: '14px',
                                background: '#6A9C89', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '1.5rem', margin: '0 auto 1.2rem', color: '#fff'
                            }}>
                                {f.icon}
                            </div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#16423C', marginBottom: '0.8rem' }}>{f.title}</h3>
                            <p style={{ color: '#6A9C89', fontSize: '0.95rem', lineHeight: 1.6 }}>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section style={{ padding: '80px 8%', textAlign: 'center', background: '#16423C', color: '#fff' }}>
                <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '1rem' }}>Join Us in Making a Difference</h2>
                <p style={{ fontSize: '1.15rem', color: '#C4DAD2', maxWidth: '650px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
                    Sign up today and help us combat food waste while feeding those in need. Every single meal makes a difference.
                </p>
                <button
                    style={{
                        padding: '16px 40px', fontSize: '1.1rem', fontWeight: 700,
                        background: '#6A9C89', color: '#fff', border: 'none', borderRadius: '50px',
                        cursor: 'pointer', boxShadow: '0 6px 20px rgba(106,156,137,0.3)',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={e => { e.target.style.background = '#C4DAD2'; e.target.style.color = '#16423C'; }}
                    onMouseLeave={e => { e.target.style.background = '#6A9C89'; e.target.style.color = '#fff'; }}
                    onClick={() => navigate('/register')}
                >
                    Start Donating Today
                </button>
            </section>

            {/* Footer */}
            <footer style={{
                background: '#16423C', borderTop: '1px solid rgba(196,218,210,0.15)',
                padding: '2rem 8%', display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', flexWrap: 'wrap', gap: '1rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#6A9C89' }}>KindKart</span>
                    <span style={{ borderLeft: '1px solid rgba(196,218,210,0.3)', paddingLeft: '0.8rem', fontSize: '0.85rem', color: '#C4DAD2' }}>
                        © {new Date().getFullYear()} All rights reserved.
                    </span>
                </div>
                <div style={{ display: 'flex', gap: '2rem' }}>
                    <span style={{ color: '#C4DAD2', cursor: 'pointer', fontSize: '0.95rem', transition: 'color 0.2s' }}
                        onMouseEnter={e => e.target.style.color = '#6A9C89'}
                        onMouseLeave={e => e.target.style.color = '#C4DAD2'}
                        onClick={() => navigate('/login')}>Login</span>
                    <span style={{ color: '#C4DAD2', cursor: 'pointer', fontSize: '0.95rem', transition: 'color 0.2s' }}
                        onMouseEnter={e => e.target.style.color = '#6A9C89'}
                        onMouseLeave={e => e.target.style.color = '#C4DAD2'}
                        onClick={() => navigate('/register')}>Sign Up</span>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;