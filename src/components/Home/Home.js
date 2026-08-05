import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import './Home.scss';

const Home = () => {
    const { user } = useContext(UserContext);
    const history = useHistory();

    const handleNavigate = (path) => {
        history.push(path);
    };

    return (
        <div className="home-page-container">
            {/* Hero Section */}
            <div className="hero-section text-center text-light">
                <div className="hero-overlay"></div>
                <div className="container hero-content">
                    <span className="badge bg-info-glow mb-3 py-2 px-3 text-uppercase tracking-wider">
                        Full-Stack Auth System
                    </span>
                    {user && user.isAuthenticated ? (
                        <>
                            <h1 className="display-4 fw-bold mb-3 hero-title">
                                Welcome Back, <span className="text-gradient">{user.account.username || 'User'}</span>!
                            </h1>
                            <p className="lead text-muted-light mb-4 mx-auto hero-subtitle">
                                You are logged in with group <strong className="text-info">{user.account.groupWithRoles?.name || 'Guest'}</strong>.
                                Manage users, roles, and group permissions securely from your dashboard.
                            </p>
                            <div className="d-flex justify-content-center gap-3 flex-wrap">
                                <button className="btn btn-primary-glow btn-lg px-4" onClick={() => handleNavigate('/users')}>
                                    <i className="fa fa-users me-2"></i> Manage Users
                                </button>
                                <button className="btn btn-outline-light-glow btn-lg px-4" onClick={() => handleNavigate('/roles')}>
                                    <i className="fa fa-cogs me-2"></i> Define Roles
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <h1 className="display-4 fw-bold mb-3 hero-title">
                                Secure JWT <span className="text-gradient">Authentication</span>
                            </h1>
                            <p className="lead text-muted-light mb-4 mx-auto hero-subtitle">
                                A premium full-stack solution featuring secure HttpOnly cookies, 
                                JSON Web Tokens (JWT), and robust Role-Based Access Control (RBAC).
                            </p>
                            <div className="d-flex justify-content-center gap-3 flex-wrap">
                                <button className="btn btn-primary-glow btn-lg px-4" onClick={() => handleNavigate('/login')}>
                                    <i className="fa fa-sign-in me-2"></i> Get Started Now
                                </button>
                                <button className="btn btn-outline-light-glow btn-lg px-4" onClick={() => handleNavigate('/about')}>
                                    <i className="fa fa-info-circle me-2"></i> Learn More
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Dashboard / Quick Stats Section for logged in users */}
            {user && user.isAuthenticated && (
                <div className="container my-5 py-3">
                    <h3 className="section-title text-center mb-5 font-bold">
                        <i className="fa fa-th-large me-2 text-primary"></i>Quick Actions & System Stats
                    </h3>
                    <div className="row g-4">
                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="dashboard-card card-glow h-100" onClick={() => handleNavigate('/users')}>
                                <div className="card-icon text-primary">
                                    <i className="fa fa-users"></i>
                                </div>
                                <h4>Users Directory</h4>
                                <p className="card-desc text-muted">Create, edit, search, and delete registered user accounts.</p>
                                <div className="card-link mt-auto">
                                    Manage Users <i className="fa fa-arrow-right ms-1"></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="dashboard-card card-glow h-100" onClick={() => handleNavigate('/roles')}>
                                <div className="card-icon text-success">
                                    <i className="fa fa-shield"></i>
                                </div>
                                <h4>System Roles</h4>
                                <p className="card-desc text-muted">Create granular system roles and map permissions to actions.</p>
                                <div className="card-link mt-auto">
                                    Manage Roles <i className="fa fa-arrow-right ms-1"></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="dashboard-card card-glow h-100" onClick={() => handleNavigate('/group-role')}>
                                <div className="card-icon text-warning">
                                    <i className="fa fa-sliders"></i>
                                </div>
                                <h4>Group Permissions</h4>
                                <p className="card-desc text-muted">Assign permission sets to user groups like Admins, Devs, Users.</p>
                                <div className="card-link mt-auto">
                                    Configure Groups <i className="fa fa-arrow-right ms-1"></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="dashboard-card card-glow h-100" onClick={() => handleNavigate('/projects')}>
                                <div className="card-icon text-danger">
                                    <i className="fa fa-folder-open"></i>
                                </div>
                                <h4>Projects Board</h4>
                                <p className="card-desc text-muted">Protected mock dashboard demonstrating RBAC resource filtering.</p>
                                <div className="card-link mt-auto">
                                    View Projects <i className="fa fa-arrow-right ms-1"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Core Features Grid */}
            <div className="bg-gradient-gray py-5 border-top border-bottom">
                <div className="container my-4">
                    <h3 className="section-title text-center mb-2 font-bold">Key Architectural Pillars</h3>
                    <p className="text-center text-muted mb-5 max-w-xl mx-auto">
                        Engineered with performance, security, and developer productivity in mind.
                    </p>
                    <div className="row g-4">
                        <div className="col-12 col-md-6">
                            <div className="feature-item d-flex gap-4 p-4 rounded-4 shadow-sm bg-white h-100">
                                <div className="feature-icon bg-light-primary text-primary flex-shrink-0">
                                    <i className="fa fa-key"></i>
                                </div>
                                <div>
                                    <h5 className="fw-semibold">HttpOnly Cookie JWT Storage</h5>
                                    <p className="text-muted mb-0">
                                        JWT tokens are stored inside HTTP-Only, Secure, SameSite cookies. 
                                        This completely mitigates Cross-Site Scripting (XSS) token theft vulnerabilities.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="feature-item d-flex gap-4 p-4 rounded-4 shadow-sm bg-white h-100">
                                <div className="feature-icon bg-light-success text-success flex-shrink-0">
                                    <i className="fa fa-lock"></i>
                                </div>
                                <div>
                                    <h5 className="fw-semibold">Role-Based Access Control</h5>
                                    <p className="text-muted mb-0">
                                        Dynamically load user routes and API execution authorizations based on backend database relations. 
                                        Admins can grant or revoke roles instantly.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="feature-item d-flex gap-4 p-4 rounded-4 shadow-sm bg-white h-100">
                                <div className="feature-icon bg-light-warning text-warning flex-shrink-0">
                                    <i className="fa fa-refresh"></i>
                                </div>
                                <div>
                                    <h5 className="fw-semibold">Silent Token Refresh</h5>
                                    <p className="text-muted mb-0">
                                        Ensures seamless user experience with automated background cookie handshakes that 
                                        keep users logged in securely without interrupted browsing.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="feature-item d-flex gap-4 p-4 rounded-4 shadow-sm bg-white h-100">
                                <div className="feature-icon bg-light-danger text-danger flex-shrink-0">
                                    <i className="fa fa-paint-brush"></i>
                                </div>
                                <div>
                                    <h5 className="fw-semibold">Responsive & Elegant UI</h5>
                                    <p className="text-muted mb-0">
                                        Fully tailored stylesheets built using Scss nesting and React Bootstrap grid layout system. 
                                        Optimized for mobile, tablet, and desktop viewports.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* JWT Authentication Workflow Showcase */}
            <div className="container my-5 py-4">
                <h3 className="section-title text-center mb-5 font-bold">Authentication Security Workflow</h3>
                <div className="row g-4 text-center">
                    <div className="col-12 col-md-4">
                        <div className="workflow-step position-relative">
                            <div className="step-number">1</div>
                            <h5 className="mt-3 fw-bold">User Login</h5>
                            <p className="text-muted px-3">
                                User inputs credentials on frontend. Backend validates password via bcrypt hashing.
                            </p>
                            <div className="step-arrow d-none d-md-block">
                                <i className="fa fa-chevron-right text-muted"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="workflow-step position-relative">
                            <div className="step-number">2</div>
                            <h5 className="mt-3 fw-bold">HTTP-Only Cookie</h5>
                            <p className="text-muted px-3">
                                Server signs JWT and attaches it to an HTTP-Only, SameSite cookie, hidden from client scripts.
                            </p>
                            <div className="step-arrow d-none d-md-block">
                                <i className="fa fa-chevron-right text-muted"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="workflow-step">
                            <div className="step-number">3</div>
                            <h5 className="mt-3 fw-bold">Authorized Operations</h5>
                            <p className="text-muted px-3">
                                Every subsequent request automatically attaches the cookie. API route validation permits/denies resource access.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
