import React from 'react'
import logo from '../assets/expense_logo.png'
import './Header.css'

export default function Header() {
    return (
        <header className="custom-header">
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src={logo} alt="MoneyMap Logo" className="header-logo" />
                        <span className="brand-text">MoneyMap</span>
                    </a>

                    <button 
                        className="navbar-toggler" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#navbarNavAltMarkup" 
                        aria-controls="navbarNavAltMarkup" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <a className="nav-link active" href="#">
                                Dashboard
                            </a>
                            <a className="nav-link" href="#">
                                Features
                            </a>
                            <a className="nav-link" href="#">
                                Support
                            </a>
                            <a className="nav-link" href="#">
                                Pricing
                            </a>
                        </div>
                    </div>
                    
                    {/* <div className="header-actions">
                        <button type="button" className="btn btn-outline-primary header-btn login-btn">
                            Login
                        </button>
                        <button type="button" className="btn btn-primary header-btn signup-btn">
                            Sign Up
                        </button>
                    </div> */}
                </div>
            </nav>
        </header>
    )
}
