import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { TbFidgetSpinner } from 'react-icons/tb'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, Home } from 'lucide-react'
import useAuth from '../../hooks/useAuth'
import toast from 'react-hot-toast'

const Login = () => {
  const navigate = useNavigate()
  const { signIn, signInWithGoogle, resetPassword, loading, setLoading } = useAuth()
  const [showResetModal, setShowResetModal] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const location = useLocation()
  const from = location?.state || '/';

  const handleLogin = async e => {
    e.preventDefault()
    const form = e.target
    const email = form.email.value
    const password = form.password.value

    try {
      setLoading(true)
      await signIn(email, password)
      toast.success('Welcome back to Acommo!')
      navigate(from)
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      setLoading(true)
      await signInWithGoogle()
      toast.success('Logged in with Google!')
      navigate(from)
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async e => {
    e.preventDefault()
    if (!resetEmail) {
      toast.error('Please enter your email')
      return
    }
    try {
      setLoading(true)
      await resetPassword(resetEmail)
      toast.success('Password reset email sent!')
      setShowResetModal(false)
      setResetEmail('')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="h-screen flex flex-col md:flex-row font-sans selection:bg-rose-100 selection:text-rose-900 overflow-hidden">
      {/* Left Side: Visual Experience */}
      <section className="hidden md:flex md:w-2/3 relative overflow-hidden bg-rose-50">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            alt="Architectural Excellence" 
            className="w-full h-full object-cover" 
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-rose-900/60 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 p-12 mt-auto mb-16 w-full max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="mb-4">
              <span className="text-xs font-bold text-white uppercase tracking-[0.3em] bg-rose-500/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                Elevated Living
              </span>
            </div>
            <h1 className="text-5xl font-black text-white mb-6 leading-tight uppercase tracking-tighter">
              Your gateway to <br />
              <span className="text-rose-200">architectural wonders</span>
            </h1>
            <p className="text-base text-white/80 max-w-md leading-relaxed">
              Join an exclusive community of travelers and homeowners who appreciate the finer details.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Right Side: Interaction Canvas */}
      <section className="w-full md:w-1/3 flex flex-col bg-white p-8 md:p-10 justify-center items-center relative overflow-hidden h-full">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-60" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-50 rounded-full blur-3xl -ml-32 -mb-32 opacity-60" />

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-[360px] relative z-10"
        >
          {/* Brand Anchor */}
          <div className="mb-8">
            <Link to="/" className="flex items-center gap-2 text-rose-500 mb-4 group w-fit">
              <div className="p-1.5 bg-rose-50 rounded-lg group-hover:bg-rose-100 transition-colors">
                <Home className="w-5 h-5" />
              </div>
              <span className="text-xl font-black tracking-tighter uppercase">Acommo</span>
            </Link>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-1">Welcome back</h2>
            <p className="text-sm text-gray-500">Please enter your details to access your account.</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider" htmlFor="email">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-rose-500 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <input 
                  required
                  name="email"
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-rose-500/10 focus:border-rose-400 transition-all placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider" htmlFor="password">
                  Password
                </label>
                <button 
                  type="button"
                  onClick={() => setShowResetModal(true)}
                  className="text-xs font-bold text-rose-500 hover:text-rose-600 transition-colors uppercase tracking-widest"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-rose-500 transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input 
                  required
                  name="password"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-rose-500/10 focus:border-rose-400 transition-all placeholder:text-gray-400"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button 
              disabled={loading}
              type="submit"
              className="w-full bg-gradient-to-r from-rose-400 to-pink-500 text-white py-4 px-6 rounded-2xl font-bold uppercase tracking-widest shadow-xl shadow-rose-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? <TbFidgetSpinner className="animate-spin w-5 h-5" /> : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center py-8">
            <div className="flex-grow border-t border-gray-100"></div>
            <span className="flex-shrink mx-4 text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">or continue with</span>
            <div className="flex-grow border-t border-gray-100"></div>
          </div>

          {/* Social Login */}
          <button 
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 group disabled:opacity-70"
          >
            <FcGoogle className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-gray-700">Google</span>
          </button>

          {/* Footer Link */}
          <p className="mt-12 text-center text-gray-500">
            Don&apos;t have an account? 
            <Link to="/signup" className="font-bold text-rose-500 hover:underline ml-2 transition-colors">
              Create an account
            </Link>
          </p>

          {/* Contextual Footer */}
          <footer className="mt-20 pt-8 border-t border-gray-100 w-full">
            <div className="flex flex-wrap justify-center gap-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <a className="hover:text-rose-500 transition-colors" href="#">Privacy</a>
              <a className="hover:text-rose-500 transition-colors" href="#">Terms</a>
              <a className="hover:text-rose-500 transition-colors" href="#">Support</a>
              <span className="opacity-30">© 2024 Acommo</span>
            </div>
          </footer>
        </motion.div>
      </section>

      {/* 🔹 Reset Password Modal */}
      <AnimatePresence>
        {showResetModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowResetModal(false)}
              className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white p-8 rounded-3xl w-full max-w-sm relative z-10 shadow-2xl"
            >
              <h2 className="text-2xl font-black text-gray-900 mb-2">Reset Password</h2>
              <p className="text-gray-500 text-sm mb-6">
                Enter your email to receive a password reset link.
              </p>
              <form onSubmit={handleResetPassword}>
                <input
                  required
                  type="email"
                  value={resetEmail}
                  onChange={e => setResetEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-rose-500/10 focus:border-rose-400 transition-all mb-6"
                />
                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-rose-400 to-pink-500 text-white py-3 rounded-xl font-bold uppercase text-xs tracking-widest shadow-lg shadow-rose-500/25 hover:scale-[1.02] transition-all"
                  >
                    {loading ? <TbFidgetSpinner className="animate-spin mx-auto" /> : "Send Link"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowResetModal(false)}
                    className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-gray-200 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  )
}

export default Login

