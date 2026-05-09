import { useState } from 'react'
import { toast } from 'react-hot-toast'
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { BsFillHouseAddFill } from 'react-icons/bs'

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
    <div className="min-h-screen flex items-center justify-center bg-[#FFF0EF]/30 p-4">
      <div className="bg-white rounded-3xl shadow-sm border border-[#EAD3D2] p-10 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-rose-500">
          <BsFillHouseAddFill size={40} />
        </div>
        <h2 className="text-3xl font-black text-[#261817] mb-3 uppercase tracking-tighter">
          Become a Host
        </h2>
        <p className="text-[#59413F] mb-8 font-medium leading-relaxed">
          Unlock your potential as a host. Submit your request today and our team will review it shortly.
        </p>
        <button
          onClick={handleBecomeHost}
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-rose-400 to-pink-500 text-white px-8 py-4 rounded-xl font-bold uppercase text-xs tracking-widest transition-all shadow-xl shadow-rose-500/25 hover:shadow-rose-500/40 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Send Request'}
        </button>
      </div>
    </div>
  )
}

export default BecomeHost
