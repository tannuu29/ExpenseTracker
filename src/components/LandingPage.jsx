import React, { useState, useEffect } from 'react'
import photo from '../assets/expense_logo.png'
import './LandingPage.css'

export default function LandingPage() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark'
    return savedTheme
  })

  useEffect(() => {
    // Apply theme on mount and when theme changes
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
    document.body.style.backgroundColor = theme === 'dark' ? '#242424' : '#ffffff'
    document.body.style.color = theme === 'dark' ? 'rgba(255, 255, 255, 0.87)' : '#1a1a1a'
  }, [theme])

  // Apply theme on initial load
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark'
    document.documentElement.setAttribute('data-theme', savedTheme)
    document.body.style.backgroundColor = savedTheme === 'dark' ? '#242424' : '#ffffff'
    document.body.style.color = savedTheme === 'dark' ? 'rgba(255, 255, 255, 0.87)' : '#1a1a1a'
  }, [])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className="landing-container">
      <button 
        className="theme-toggle-btn"
        onClick={toggleTheme}
        aria-label="Toggle theme"
        title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {theme === 'dark' ? (
          <svg className="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        ) : (
          <svg className="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        )}
      </button>
      <div className="landing-header-buttons">
        <button type="button" className="btn btn-outline-light login-btn">Login</button>
        <button type="button" className="btn btn-success signup-btn">Sign Up</button>
      </div>
      <div className="landing-content">
        <div className="logo-section">
          <img src={photo} alt="MoneyMap Logo" className="landing-logo" />
        </div>
        <div className="title-section">
          <h1 className="landing-title">MoneyMap</h1>
          <p className="landing-subtitle">The Expense Tracker</p>
        </div>
        <div className="description-section">
          <p className="landing-description">Save your money with Expense Tracker</p>
          <p className="landing-tagline">Take control of your finances and track every expense effortlessly</p>
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

