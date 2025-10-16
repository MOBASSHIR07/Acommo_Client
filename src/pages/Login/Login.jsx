import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { TbFidgetSpinner } from 'react-icons/tb'
import { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import toast from 'react-hot-toast'

const Login = () => {
  const navigate = useNavigate()
  const { signIn, signInWithGoogle, resetPassword, loading, setLoading } = useAuth()
  const [showResetModal, setShowResetModal] = useState(false)
  const [resetEmail, setResetEmail] = useState('')

  // 🔹 Handle Email/Password Login
  const handleLogin = async e => {
    e.preventDefault()
    const form = e.target
    const email = form.email.value
    const password = form.password.value

    try {
      setLoading(true)
      await signIn(email, password)
      toast.success('Login Successful!')
      navigate('/')
    } catch (err) {
      console.log(err)
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  // 🔹 Handle Google Login
  const handleGoogleLogin = async () => {
    try {
      setLoading(true)
      await signInWithGoogle()
      toast.success('Logged in with Google!')
      navigate('/')
    } catch (err) {
      console.log(err)
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  // 🔹 Handle Password Reset
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
      console.log(err)
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Log In</h1>
          <p className='text-sm text-gray-400'>
            Sign in to access your account
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className='space-y-6'>
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                type='email'
                name='email'
                id='email'
                required
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
              />
            </div>
            <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  Password
                </label>
              </div>
              <input
                type='password'
                name='password'
                autoComplete='current-password'
                id='password'
                required
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
              />
            </div>
          </div>

          <div>
            <button
              disabled={loading}
              type='submit'
              className='bg-rose-500 w-full rounded-md py-3 text-white'
            >
              {loading ? (
                <TbFidgetSpinner className='animate-spin mx-auto' />
              ) : (
                'Continue'
              )}
            </button>
          </div>
        </form>

        {/* Forgot Password */}
        <div className='space-y-1 mt-3 text-center'>
          <button
            type='button'
            onClick={() => setShowResetModal(true)}
            className='text-xs hover:underline hover:text-rose-500 text-gray-400'
          >
            Forgot password?
          </button>
        </div>

        {/* Divider */}
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px bg-gray-300'></div>
          <p className='px-3 text-sm text-gray-500'>
            Login with social accounts
          </p>
          <div className='flex-1 h-px bg-gray-300'></div>
        </div>

        {/* Google Login */}
        <div
          onClick={handleGoogleLogin}
          className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 rounded-md cursor-pointer hover:bg-gray-200 transition'
        >
          <FcGoogle size={32} />
          <p>Continue with Google</p>
        </div>

        {/* Sign Up Link */}
        <p className='px-6 text-sm text-center text-gray-400'>
          Don&apos;t have an account yet?{' '}
          <Link
            to='/signup'
            className='hover:underline hover:text-rose-500 text-gray-600'
          >
            Sign up
          </Link>
          .
        </p>
      </div>

      {/* 🔹 Reset Password Modal */}
      {showResetModal && (
        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-40'>
          <div className='bg-white p-6 rounded-xl w-80 text-center shadow-lg'>
            <h2 className='text-lg font-semibold mb-2'>Reset Password</h2>
            <p className='text-sm text-gray-500 mb-4'>
              Enter your email to receive a password reset link.
            </p>
            <form onSubmit={handleResetPassword}>
              <input
                type='email'
                value={resetEmail}
                onChange={e => setResetEmail(e.target.value)}
                placeholder='Enter your email'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-100 text-gray-900 mb-3'
              />
              <div className='flex gap-2'>
                <button
                  type='submit'
                  disabled={loading}
                  className='bg-rose-500 flex-1 text-white py-2 rounded-md'
                >
                  {loading ? (
                    <TbFidgetSpinner className='animate-spin mx-auto' />
                  ) : (
                    'Send Link'
                  )}
                </button>
                <button
                  type='button'
                  onClick={() => setShowResetModal(false)}
                  className='bg-gray-300 flex-1 py-2 rounded-md'
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Login
