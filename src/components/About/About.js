import React from 'react';
import './About.scss';

const About = () => {
    return (
        <div className="about-page-container">
            {/* Header Section */}
            <div className="about-header text-center text-light">
                <div className="about-header-overlay"></div>
                <div className="container position-relative z-2 py-5">
                    <span className="badge bg-secondary-glow mb-3 py-2 px-3 text-uppercase tracking-wider">
                        Project Specifications
                    </span>
                    <h1 className="display-5 fw-bold mb-3 header-title">
                        About <span className="text-gradient">JWT Auth & RBAC</span>
                    </h1>
                    <p className="lead text-muted-light mx-auto max-w-xl">
                        A full-stack user management framework implementing best security practices for web application
                        authorization.
                    </p>
                </div>
            </div>

            {/* Content & Details */}
            <div className="container my-5">
                <div className="row g-5">
                    {/* Tech Stack Column */}
                    <div className="col-12 col-lg-8">
                        <h4 className="column-title mb-4">
                            <i className="fa fa-cubes me-2 text-primary"></i>Technology Stack Details
                        </h4>

                        <div className="row g-4">
                            {/* Frontend Stack */}
                            <div className="col-12 col-md-6">
                                <div className="tech-stack-card h-100">
                                    <div className="tech-badge bg-primary-subtle text-primary">
                                        <i className="fa fa-code"></i> Frontend
                                    </div>
                                    <h5 className="mt-3 fw-bold">React Single Page App</h5>
                                    <ul className="tech-list mt-3">
                                        <li>
                                            <i className="fa fa-check text-success"></i> <strong>React.js (v17)</strong>{' '}
                                            - Component lifecycle & React hooks.
                                        </li>
                                        <li>
                                            <i className="fa fa-check text-success"></i>{' '}
                                            <strong>React Router (v5)</strong> - Client-side dynamic routing.
                                        </li>
                                        <li>
                                            <i className="fa fa-check text-success"></i>{' '}
                                            <strong>React Bootstrap</strong> - Styled grid, navigation, modals.
                                        </li>
                                        <li>
                                            <i className="fa fa-check text-success"></i> <strong>Sass (SCSS)</strong> -
                                            Modular styling & variables.
                                        </li>
                                        <li>
                                            <i className="fa fa-check text-success"></i> <strong>Axios</strong> -
                                            Cookie-enabled AJAX requests with interceptors.
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Backend Stack */}
                            <div className="col-12 col-md-6">
                                <div className="tech-stack-card h-100">
                                    <div className="tech-badge bg-success-subtle text-success">
                                        <i className="fa fa-server"></i> Backend
                                    </div>
                                    <h5 className="mt-3 fw-bold">Node.js API Server</h5>
                                    <ul className="tech-list mt-3">
                                        <li>
                                            <i className="fa fa-check text-success"></i>{' '}
                                            <strong>Node.js & Express</strong> - RESTful API routes & custom middleware.
                                        </li>
                                        <li>
                                            <i className="fa fa-check text-success"></i> <strong>Sequelize ORM</strong>{' '}
                                            - Models associations (M:N), seeders.
                                        </li>
                                        <li>
                                            <i className="fa fa-check text-success"></i> <strong>MySQL Database</strong>{' '}
                                            - Structured storage of Users, Groups, Roles.
                                        </li>
                                        <li>
                                            <i className="fa fa-check text-success"></i> <strong>Bcryptjs</strong> -
                                            Secure salted password hashing.
                                        </li>
                                        <li>
                                            <i className="fa fa-check text-success"></i> <strong>Cookie Parser</strong>{' '}
                                            - Read secure token parameters inside headers.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Security Best Practices */}
                        <div className="mt-5">
                            <h4 className="column-title mb-4">
                                <i className="fa fa-shield me-2 text-warning"></i>Security Auditing
                            </h4>
                            <div className="security-card p-4 rounded-4 shadow-sm bg-white">
                                <div className="d-flex flex-column flex-sm-row gap-3 align-items-sm-center mb-3">
                                    <div className="security-icon bg-warning-subtle text-warning">
                                        <i className="fa fa-lock-open"></i>
                                    </div>
                                    <h5 className="mb-0 fw-bold">Mitigating Common Web Vulnerabilities</h5>
                                </div>
                                <p className="text-muted mb-3">
                                    Most default JWT implementations save tokens in <code>localStorage</code> or{' '}
                                    <code>sessionStorage</code>. However, those storage mechanisms are vulnerable to
                                    Cross-Site Scripting (XSS) attacks. If a hacker runs a malicious script on your site
                                    (e.g., via npm dependencies or user content), they can easily extract the token.
                                </p>
                                <div className="border-start border-4 border-warning ps-3 py-1 bg-light rounded-end mb-0">
                                    <p className="small text-dark mb-0 fw-semibold">
                                        <i className="fa fa-info-circle me-1"></i> Solution:
                                    </p>
                                    <p className="small text-muted mb-0">
                                        By issuing the JWT inside an <strong>HttpOnly Cookie</strong>, browser scripts
                                        are unable to read or write the cookie. Browser clients automatically attach it
                                        to all backend requests on the respective domain. Furthermore, setting{' '}
                                        <strong>SameSite=Strict/Lax</strong> restricts Cross-Site Request Forgery
                                        (CSRF).
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Developer Profile Column */}
                    <div className="col-12 col-lg-4">
                        <h4 className="column-title mb-4">
                            <i className="fa fa-user me-2 text-info"></i>Developer Profile
                        </h4>
                        <div className="developer-card text-center p-4 rounded-4 shadow-sm bg-white border">
                            <div className="dev-avatar mx-auto mb-3">
                                <i className="fa fa-user-circle"></i>
                            </div>
                            <h5 className="fw-bold mb-1">HuyPhatt / Developer</h5>
                            <p className="text-muted small mb-3">Full Stack Node.js & React Developer</p>
                            <p className="text-muted-dark small px-2 mb-4">
                                Passionate about building secure, responsive, and robust enterprise applications using
                                cutting-edge JavaScript frameworks.
                            </p>

                            <hr />

                            <div className="d-flex justify-content-center gap-3 mt-3">
                                <a
                                    href="https://github.com/Hstahp"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn btn-outline-dark btn-sm rounded-circle social-icon"
                                >
                                    <i className="fa fa-github"></i>
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/huy-phat-le-nguyen-532bbb381/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn btn-outline-primary btn-sm rounded-circle social-icon"
                                >
                                    <i className="fa fa-linkedin"></i>
                                </a>
                                <a
                                    href="mailto:phatle219@gmail.com"
                                    className="btn btn-outline-danger btn-sm rounded-circle social-icon"
                                >
                                    <i className="fa fa-envelope-o"></i>
                                </a>
                            </div>
                        </div>

                        {/* Database Relationships Quick View */}
                        <div className="mt-4 p-4 rounded-4 shadow-sm bg-white border">
                            <h6 className="fw-bold mb-3 border-bottom pb-2">
                                <i className="fa fa-database me-2 text-secondary"></i>Database Schema
                            </h6>
                            <div className="d-flex flex-column gap-2 small">
                                <div className="d-flex justify-content-between border-bottom pb-1">
                                    <span className="text-muted">Users BelongTo:</span>
                                    <span className="fw-semibold">Group</span>
                                </div>
                                <div className="d-flex justify-content-between border-bottom pb-1">
                                    <span className="text-muted">Group HasMany:</span>
                                    <span className="fw-semibold">Users</span>
                                </div>
                                <div className="d-flex justify-content-between border-bottom pb-1">
                                    <span className="text-muted">Group BelongsToMany:</span>
                                    <span className="fw-semibold">Roles</span>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span className="text-muted">Roles BelongsToMany:</span>
                                    <span className="fw-semibold">Groups</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
