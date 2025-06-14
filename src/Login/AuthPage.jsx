import React from 'react'
import LoginForm from './LoginForm'
import SignUpForm from './SignUp'
const AuthPage = () => {

  const [isLogin, setIsLogin] = React.useState(true)
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="font-bold text-2xl">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
        </div>
        
        {/* Toggle Buttons */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              isLogin 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              !isLogin 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Sign Up
          </button>
        </div>
        
        {isLogin ? <LoginForm /> : <SignUpForm />}
      </div>
    </div>
  )
}

export default AuthPage