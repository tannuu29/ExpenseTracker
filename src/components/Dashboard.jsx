import React, { useState, useEffect } from 'react'
import Header from './Header'
import './Dashboard.css'

export default function Dashboard() {
  const [expenses, setExpenses] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingExpense, setEditingExpense] = useState(null)
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    date: ''
  })
  const [filterData, setFilterData] = useState({
    category: '',
    date: '',
    minAmount: '',
    maxAmount: ''
  })

  // Get today's date in YYYY-MM-DD format for max date validation
  const getTodayDate = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const maxDate = getTodayDate()

  // Load expenses from localStorage on mount
  useEffect(() => {
    const savedExpenses = localStorage.getItem('expenses')
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses))
    }
  }, [])

  // Save expenses to localStorage whenever expenses change
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddExpense = (e) => {
    e.preventDefault()
    if (!formData.description || !formData.amount || !formData.category || !formData.date) {
      alert('Please fill in all fields')
      return
    }

    // Validate that date is not in the future
    if (formData.date > maxDate) {
      alert('Cannot add expenses for future dates. Please select today or a past date.')
      return
    }

    const newExpense = {
      id: Date.now(),
      ...formData,
      amount: parseFloat(formData.amount)
    }
    
    setExpenses(prev => [newExpense, ...prev])
    setFormData({ description: '', amount: '', category: '', date: '' })
    setShowAddForm(false)
  }

  const handleEditExpense = (expense) => {
    setEditingExpense(expense)
    setFormData({
      description: expense.description,
      amount: expense.amount,
      category: expense.category,
      date: expense.date
    })
    setShowAddForm(true)
  }

  const handleUpdateExpense = (e) => {
    e.preventDefault()
    if (!formData.description || !formData.amount || !formData.category || !formData.date) {
      alert('Please fill in all fields')
      return
    }

    // Validate that date is not in the future
    if (formData.date > maxDate) {
      alert('Cannot update expenses for future dates. Please select today or a past date.')
      return
    }

    setExpenses(prev => prev.map(expense => 
      expense.id === editingExpense.id
        ? { ...expense, ...formData, amount: parseFloat(formData.amount) }
        : expense
    ))
    
    setFormData({ description: '', amount: '', category: '', date: '' })
    setShowAddForm(false)
    setEditingExpense(null)
  }

  const handleDeleteExpense = (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      setExpenses(prev => prev.filter(expense => expense.id !== id))
    }
  }

  const handleCancel = () => {
    setShowAddForm(false)
    setEditingExpense(null)
    setFormData({ description: '', amount: '', category: '', date: '' })
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilterData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleClearFilters = () => {
    setFilterData({
      category: '',
      date: '',
      minAmount: '',
      maxAmount: ''
    })
  }

  const filteredExpenses = expenses.filter(expense => {
    if (filterData.category && expense.category !== filterData.category) {
      return false
    }
    if (filterData.date && expense.date !== filterData.date) {
      return false
    }
    if (filterData.minAmount && expense.amount < parseFloat(filterData.minAmount)) {
      return false
    }
    if (filterData.maxAmount && expense.amount > parseFloat(filterData.maxAmount)) {
      return false
    }
    return true
  })

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  return (
    <div className="dashboard-container">
      <Header />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <div className="dashboard-title">
            <h1>Expense Dashboard</h1>
            <p className="dashboard-subtitle">Track and manage your expenses</p>
          </div>
          {!showAddForm && (
            <button 
              className="add-expense-btn"
              onClick={() => setShowAddForm(true)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add Expense
            </button>
          )}
        </div>

        <div className="expense-stats">
          <div className="stat-card">
            <div className="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
            <div className="stat-info">
              <p className="stat-label">Total Expenses</p>
              <p className="stat-value">${totalExpenses.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {showAddForm && (
          <div className="expense-form-container">
            <form onSubmit={editingExpense ? handleUpdateExpense : handleAddExpense} className="expense-form">
              <h2>{editingExpense ? 'Edit Expense' : 'Add New Expense'}</h2>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="What did you spend on?"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  step="0.01"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="">Select a category</option>
                  <option value="Food">Food</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Bills">Bills</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Education">Education</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  max={maxDate}
                  className="form-input"
                />
              </div>
              <div className="form-actions">
                <button type="button" onClick={handleCancel} className="cancel-btn">
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  {editingExpense ? 'Update Expense' : 'Add Expense'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="filter-container">
          <h2 className="filter-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            Filter Expenses
          </h2>
          <div className="filter-grid">
            <div className="filter-group">
              <label htmlFor="filter-category">Category</label>
              <select
                id="filter-category"
                name="category"
                value={filterData.category}
                onChange={handleFilterChange}
                className="form-input"
              >
                <option value="">All Categories</option>
                <option value="Food">Food</option>
                <option value="Transportation">Transportation</option>
                <option value="Shopping">Shopping</option>
                <option value="Bills">Bills</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="filter-group">
              <label htmlFor="filter-date">Date</label>
              <input
                type="date"
                id="filter-date"
                name="date"
                value={filterData.date}
                onChange={handleFilterChange}
                className="form-input"
              />
            </div>
            <div className="filter-group">
              <label htmlFor="filter-min-amount">Min Amount</label>
              <input
                type="number"
                id="filter-min-amount"
                name="minAmount"
                value={filterData.minAmount}
                onChange={handleFilterChange}
                placeholder="0.00"
                step="0.01"
                className="form-input"
              />
            </div>
            <div className="filter-group">
              <label htmlFor="filter-max-amount">Max Amount</label>
              <input
                type="number"
                id="filter-max-amount"
                name="maxAmount"
                value={filterData.maxAmount}
                onChange={handleFilterChange}
                placeholder="0.00"
                step="0.01"
                className="form-input"
              />
            </div>
            <div className="filter-actions">
              <button onClick={handleClearFilters} className="clear-filter-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                Clear Filters
              </button>
            </div>
          </div>
          {(filterData.category || filterData.date || filterData.minAmount || filterData.maxAmount) && (
            <div className="filter-results">
              Showing {filteredExpenses.length} of {expenses.length} expenses
            </div>
          )}
        </div>

        <div className="expenses-list-container">
          <h2 className="expenses-list-title">All Expenses</h2>
          {expenses.length === 0 ? (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3">
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
              <p>No expenses yet. Add your first expense to get started!</p>
            </div>
          ) : filteredExpenses.length === 0 ? (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="M21 21l-4.35-4.35"></path>
              </svg>
              <p>No expenses match your filter criteria. Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="expenses-list">
              {filteredExpenses.map(expense => (
                <div key={expense.id} className="expense-card">
                  <div className="expense-card-header">
                    <div className="expense-category">
                      <span className="category-badge">{expense.category}</span>
                    </div>
                    <div className="expense-amount">${expense.amount.toFixed(2)}</div>
                  </div>
                  <div className="expense-details">
                    <h3 className="expense-description">{expense.description}</h3>
                    <p className="expense-date">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      {new Date(expense.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                  <div className="expense-actions">
                    <button 
                      onClick={() => handleEditExpense(expense)}
                      className="edit-btn"
                      title="Edit expense"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                    </button>
                    <button 
                      onClick={() => handleDeleteExpense(expense.id)}
                      className="delete-btn"
                      title="Delete expense"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
