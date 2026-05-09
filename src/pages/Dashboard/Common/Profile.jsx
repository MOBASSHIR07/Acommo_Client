import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { toast } from 'react-hot-toast'
import { FaEdit, FaLock, FaEnvelope } from 'react-icons/fa'
import useAuth from '../../../hooks/useAuth'
import useRole from '../../../hooks/useRole'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import UpdateProfileModal from './UpdateProfileModal'
import ChangePasswordModal from './ChangePasswordModal'

const Profile = () => {
  const { user, loading, updateUserProfile, resetPassword } = useAuth()
  const [role, isLoading] = useRole()

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [passwordLoading, setPasswordLoading] = useState(false) // local modal loading

  if (loading || isLoading) return <LoadingSpinner />

  // Handle profile update
  const handleUpdateProfile = async (name, photo) => {
    try {
      await updateUserProfile(name, photo)
      toast.success('Profile updated successfully!')
      setIsEditModalOpen(false)
    } catch (err) {
      toast.error('Update failed!')
      console.error(err)
    }
  }

  // Handle password reset
  const handlePasswordReset = async () => {
    try {
      setPasswordLoading(true)
      await resetPassword(user?.email)
      toast.success('Password reset email sent! Check your inbox.')
      setIsPasswordModalOpen(false)
    } catch (err) {
      console.error(err)
      toast.success(
        'Password reset email sent! Check your inbox and spam folder.'
      )
      setIsPasswordModalOpen(false)
    } finally {
      setPasswordLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FFF0EF]/30 py-8 px-4">
      <Helmet>
        <title>Profile - Acommo</title>
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-[#EAD3D2] overflow-hidden">
          {/* Header */}
          <div className="bg-[#FFE9E7] h-32 relative border-b border-[#EAD3D2]">
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <img
                alt="profile"
                src={user?.photoURL || 'https://i.ibb.co/Fz1Bd5b/default-avatar.png'}
                className="w-32 h-32 object-cover rounded-2xl border-4 border-white shadow-lg"
              />
            </div>
          </div>

          {/* Profile Info */}
          <div className="pt-20 pb-8 px-8 text-center">
            <div className="mb-2">
              <span className="inline-block px-3 py-1 bg-[#FFF0EF] text-rose-500 border border-[#EAD3D2] rounded-full text-xs font-bold uppercase tracking-wider">
                {role?.toUpperCase() || 'GUEST'}
              </span>
            </div>

            <h1 className="text-2xl font-bold text-[#261817] mb-2 uppercase tracking-tight">
              {user?.displayName || 'Unnamed User'}
            </h1>
            <p className="text-[#59413F] flex items-center justify-center gap-2 font-medium">
              <FaEnvelope className="text-rose-500" />
              {user?.email}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="group flex items-center justify-center gap-3 bg-gradient-to-r from-rose-400 to-pink-500 text-white px-10 py-4 rounded-xl font-bold uppercase text-xs tracking-widest transition-all shadow-xl shadow-rose-500/25 hover:shadow-rose-500/40 hover:scale-105 active:scale-95"
              >
                <FaEdit className="w-4 h-4" />
                Edit Profile
              </button>
              <button
                onClick={() => setIsPasswordModalOpen(true)}
                className="group flex items-center justify-center gap-3 bg-white border-2 border-[#EAD3D2] text-rose-500 hover:bg-[#FFF0EF] px-10 py-4 rounded-xl font-bold uppercase text-xs tracking-widest transition-all hover:scale-105 active:scale-95 shadow-lg shadow-black/5"
              >
                <FaLock className="w-4 h-4" />
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <UpdateProfileModal
        isOpen={isEditModalOpen}
        closeModal={() => setIsEditModalOpen(false)}
        user={user}
        onSave={handleUpdateProfile}
      />

      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        closeModal={() => setIsPasswordModalOpen(false)}
        onReset={handlePasswordReset}
        user={user}
        isLoading={passwordLoading}
      />
    </div>
  )
}

export default Profile
