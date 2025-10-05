import React, { useState } from 'react'
import axios from '../api/axios'
import { useNavigate, Link } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/auth/login', { email, password })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Welcome Back</h2>
        
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center">{error}</div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <input 
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
            placeholder="Email" 
            value={email} 
            onChange={e=>setEmail(e.target.value)} 
          />
          <input 
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
            placeholder="Password" 
            type="password" 
            value={password} 
            onChange={e=>setPassword(e.target.value)} 
          />
          <button 
            type="submit" 
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <Link to="/register" className="text-blue-600 font-medium hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  )
}
