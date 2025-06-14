import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const LoginForm = () => {
  const [formData, setFormData] = React.useState({email: "", password: ""})
  const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state && location.state.from || "/categories"

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if(error) { setError('') }
  } 
  
    const handleSubmit = async (e) => {
      e.preventDefault()
      setLoading(true)
      setError('')

      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })

        const data = await response.json()
        if(data.success) {
          // Store proper auth token
          localStorage.setItem("authToken", data.token)
          navigate(from, {replace: true})
        }
        else {
          setError(data.message || 'Invalid credentials')
        }
          
      }
      catch(error) {
        setError('Network error. Please try again.')
        console.error('Login error:', error)
      }
      finally {
        setLoading(false)
      }
    }
     const handleForgotPassword = async () =>{
      if(!formData.email) {
        setError('Please enter your email address first')
        return
      }
      setLoading(true)
      try {
        const response = await fetch('/api/auth/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email })
        })
        const data = await response.json()
        if(data.success) {
          alert('Password reset email sent! Check your inbox.')
        } else {
          setError(data.message || 'Failed to send reset email')
        }
      }
      catch(error) {
        setError('Network error. Please try again.')
      }
      finally {
        setLoading(false)
      }
    }
    return (
          <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input type="email" id="email" name="email" value={formData.email}
              onChange={handleChange} required
              className="border rounded-lg outline-0 w-full p-2 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input type="password" id="password" name="password" value={formData.password}
              onChange={handleChange} required
              className="border rounded-lg outline-0 w-full p-2 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>
          
          <button type="submit" disabled={loading}
            className="w-full bg-blue-500 text-white py-2 px-4 mt-4 rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
          
          <div className="text-center">
            <button type="button" onClick={handleForgotPassword} disabled={!formData.email}
              className="text-blue-500 hover:underline text-sm disabled:opacity-50">
              Forgot Password?
            </button>
          </div>
        </form>
  )
  
  }

export default LoginForm