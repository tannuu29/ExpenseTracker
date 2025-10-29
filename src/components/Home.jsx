import React from 'react'
import photo from '../assets/expense_logo.png'
import './Home.css'

export default function Home() {
  return (
    <div className="home-container">
      <div className="landing-header">
        <button type="button" className="btn btn-outline-light login-btn">Login</button>
        <button type="button" className="btn btn-success signup-btn">Sign Up</button>
      </div>
      <div className="home-content">
        <div className="logo-section">
          <img src={photo} alt="MoneyMap Logo" className="home-logo" />
        </div>
        <div className="title-section">
          <h1 className="home-title">MoneyMap</h1>
          <p className="home-subtitle">The Expense Tracker</p>
        </div>
        <div className="description-section">
          <p className="home-description">Save your money with Expense Tracker</p>
          <p className="home-tagline">Take control of your finances and track every expense effortlessly</p>
        </div>
        <div className="cta-section">
          <button type="button" className="btn btn-success btn-lg start-button">
            Let's Start
          </button>
        </div>
      </div>
    </div>
  )
}
