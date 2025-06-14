import React from 'react'
import { useNavigate } from 'react-router-dom'
const SignUpForm = () => {
    const [formData, setFormData] = React.useState({firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''})
    const [error, setError] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev, [name]: value
        }))
        if(error) {
            setError('')
        }
    }
    const validateForm = () => {
        if(formData.password !== formData.confirmPassword) {
            setError('Passwords do not match')
            return false
        }
        if(formData.password.length < 6) {
            setError('Password must be at least 6 characters')
            return false
        }
        return true
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!validateForm()) {
            return
        }
        setLoading(true)
        setError('')

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password,
                    confirmPassword: formData.confirmPassword
                })
            })
            const data = await response.json()
            if(data.sucess) {
                localStorage.setItem("authToken", data.token)
                setFormData({
                  firstName: '',
                  lastName: '',
                  email: '',
                  password: '',
                  confirmPassword: ''
                })
                navigate('/categories', { replace: true })
            } 
            else {
                setError(data.message || 'Failed to create account')
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
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium mb-1">
            First Name
          </label>
          <input type="text" id="firstName" name="firstName" value={formData.firstName} 
            onChange={handleChange} required 
            className="border rounded-lg outline-0 w-full p-2 focus:ring-2 focus:ring-green-400 focus:border-transparent" />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium mb-1">
            Last Name
          </label>
          <input type="text" id="lastName" name="lastName" value={formData.lastName}onChange={handleChange} required
            className="border rounded-lg outline-0 w-full p-2 focus:ring-2 focus:ring-green-400 focus:border-transparent" />
        </div>
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input type="email" id="email" name="email" value={formData.email} 
            onChange={handleChange} required
          className="border rounded-lg outline-0 w-full p-2 focus:ring-2 focus:ring-green-400 focus:border-transparent" />
      </div>
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          Password
        </label>
        <input type="password" id="password" name="password" value={formData.password} 
            onChange={handleChange} required
          className="border rounded-lg outline-0 w-full p-2 focus:ring-2 focus:ring-green-400 focus:border-transparent"/>
      </div>
      
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
          Confirm Password
        </label>
        <input type="password" id="confirmPassword" name="confirmPassword" required
            value={formData.confirmPassword} onChange={handleChange} 
          className="border rounded-lg outline-0 w-full p-2 focus:ring-2 focus:ring-green-400 focus:border-transparent"/>
      </div>
      
      <button type="submit" disabled={loading}
        className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 disabled:opacity-50">
        {loading ? 'Creating Account...' : 'Create Account'}
      </button>
      
      <p className="text-sm text-gray-600 text-center">
        By creating an account, you agree to our{' '}
        <span className="text-blue-500 cursor-pointer hover:underline">Terms of Service</span> and{' '}
        <span className="text-blue-500 cursor-pointer hover:underline">Privacy Policy</span>
      </p>
    </form>
  )
}

export default SignUpForm