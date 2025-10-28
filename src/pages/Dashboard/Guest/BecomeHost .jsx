import { useState } from 'react'
import { toast } from 'react-hot-toast'
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure'

const BecomeHost = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleBecomeHost = async () => {
    if (!user?.email) return toast.error('User not found')

    setIsSubmitting(true)

    try {
      const currentUser = {
        email: user.email,
        role: 'guest', // keep as guest until admin approves
        status: 'Requested',
      }

      const { data } = await axiosSecure.put('/user', currentUser)

      if (data.modifiedCount > 0) {
        toast.success('Host Request Sent! Please wait for Admin Approval.')
      } else {
        toast.success('Please wait for Admin Approval.')
      }
    } catch (err) {
      console.error(err)
      toast.error('Failed to send request.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Become a Host
        </h2>
        <p className="text-gray-600 mb-6">
          Submit a request to become a host. Admin will review and approve your request.
        </p>
        <button
          onClick={handleBecomeHost}
          disabled={isSubmitting}
          className="px-6 py-3 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Request to Become Host'}
        </button>
      </div>
    </div>
  )
}

export default BecomeHost
