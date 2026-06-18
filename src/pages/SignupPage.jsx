import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function SignupPage() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirm: '' })

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (form.password !== form.confirm) {
      alert('Passwords do not match.')
      return
    }
    alert('Registration is UI-only in this demo.')
  }

  const inputClass =
    'w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#003580] transition-colors'
  const labelClass = 'block text-sm font-semibold text-gray-700 mb-1.5'

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 w-full max-w-md p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1 bg-[#003580] rounded-md px-3 py-1.5 mb-4">
              <span className="text-white font-black text-xl">Stay</span>
              <span className="text-[#febb02] font-black text-xl">Africa</span>
            </div>
            <h1 className="text-2xl font-black text-gray-900">Create your account</h1>
            <p className="text-gray-500 text-sm mt-1">Start booking your dream stays</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>First name</label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="Amara"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Last name</label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Osei"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Email address</label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Password</label>
              <input
                type="password"
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="Min. 8 characters"
                minLength={8}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Confirm password</label>
              <input
                type="password"
                name="confirm"
                required
                value={form.confirm}
                onChange={handleChange}
                placeholder="Repeat your password"
                className={inputClass}
              />
            </div>

            <p className="text-xs text-gray-400">
              By registering, you agree to our{' '}
              <Link to="#" className="text-[#003580] hover:underline">Terms of Service</Link> and{' '}
              <Link to="#" className="text-[#003580] hover:underline">Privacy Policy</Link>.
            </p>

            <button
              type="submit"
              className="w-full py-3 bg-[#003580] hover:bg-[#00224f] text-white font-bold rounded-xl text-sm transition-colors"
            >
              Create account
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-[#003580] font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
