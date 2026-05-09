import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Lock, Camera, Home, ArrowRight } from 'lucide-react'
import useAuth from '../../hooks/useAuth'
import axios from 'axios'
import toast from 'react-hot-toast'
import { TbFidgetSpinner } from 'react-icons/tb'

const SignUp = () => {
  const navigate = useNavigate()
  const { createUser, loading, setLoading, signInWithGoogle, updateUserProfile } = useAuth()
  const [previewImage, setPreviewImage] = useState(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPreviewImage(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const form = e.target
    const name = form.name.value
    const email = form.email.value
    const password = form.password.value
    const image = form.image.files[0]

    if (!image) {
      toast.error('Please upload a profile picture')
      return
    }

    const formData = new FormData()
    formData.append('image', image)

    try {
      setLoading(true)
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        formData
      )
      
      await createUser(email, password)
      await updateUserProfile(name, data.data.display_url)
      
      toast.success('Welcome to Acommo! Account created successfully.')
      navigate('/')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true)
      await signInWithGoogle()
      toast.success('Welcome to Acommo!')
      navigate('/')
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
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=100"
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
                Join the Elite
              </span>
            </div>
            <h1 className="text-5xl font-black text-white mb-6 leading-tight uppercase tracking-tighter">
              Start your journey <br />
              <span className="text-rose-200">with Acommo</span>
            </h1>
            <p className="text-base text-white/80 max-w-md leading-relaxed">
              Create an account to discover handpicked luxury villas around the world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Right Side: Interaction Canvas */}
      <section className="w-full md:w-1/3 flex flex-col bg-white p-8 md:p-10 justify-center items-center relative overflow-hidden h-full">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-60" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-50 rounded-full blur-3xl -ml-32 -mb-32 opacity-60" />

        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-[360px] relative z-10"
        >
          {/* Brand Anchor */}
          <div className="mb-6">
            <Link to="/" className="flex items-center gap-2 text-rose-500 mb-4 group w-fit">
              <div className="p-1.5 bg-rose-50 rounded-lg group-hover:bg-rose-100 transition-colors">
                <Home className="w-5 h-5" />
              </div>
              <span className="text-xl font-black tracking-tighter uppercase">Acommo</span>
            </Link>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-1">Create Account</h2>
            <p className="text-xs text-gray-500">Sign up to start your architectural exploration.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Image Upload */}
            <div className="flex items-center gap-4 mb-4">
              <div className="relative group">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-rose-50 bg-gray-100 group-hover:border-rose-100 transition-colors shadow-inner">
                  {previewImage ? (
                    <img src={previewImage} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <User size={24} />
                    </div>
                  )}
                </div>
                <label 
                  htmlFor="image" 
                  className="absolute bottom-0 right-0 p-1.5 bg-rose-500 text-white rounded-full shadow-lg cursor-pointer hover:bg-rose-600 transition-colors active:scale-95"
                >
                  <Camera size={12} />
                </label>
                <input 
                  required
                  type="file" 
                  id="image" 
                  name="image" 
                  accept="image/*" 
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Profile Picture</span>
                <span className="text-[9px] text-gray-300">JPG, PNG up to 5MB</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider" htmlFor="name">
                  Full Name
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-rose-500 transition-colors">
                    <User className="w-5 h-5" />
                  </div>
                  <input 
                    required
                    name="name"
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-rose-500/10 focus:border-rose-400 transition-all placeholder:text-gray-400"
                  />
                </div>
              </div>

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
                <label className="block text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider" htmlFor="password">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-rose-500 transition-colors">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input 
                    required
                    name="password"
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-rose-500/10 focus:border-rose-400 transition-all placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>

            <button 
              disabled={loading}
              type="submit"
              className="w-full bg-gradient-to-r from-rose-400 to-pink-500 text-white py-4 px-6 rounded-2xl font-bold uppercase tracking-widest shadow-xl shadow-rose-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin w-5 h-5" />
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center py-8">
            <div className="flex-grow border-t border-gray-100"></div>
            <span className="flex-shrink mx-4 text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">or sign up with</span>
            <div className="flex-grow border-t border-gray-100"></div>
          </div>

          <button 
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 group disabled:opacity-70"
          >
            <FcGoogle className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-gray-700">Google</span>
          </button>

          <p className="mt-10 text-center text-gray-500">
            Already have an account? 
            <Link to="/login" className="font-bold text-rose-500 hover:underline ml-2 transition-colors">
              Login
            </Link>
          </p>

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
    </main>
  )
}

export default SignUp

