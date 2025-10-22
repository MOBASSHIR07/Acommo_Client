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
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <Helmet>
        <title>Profile - Acommo</title>
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-rose-500 to-pink-600 h-32 relative">
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
              <span className="inline-block px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm font-medium">
                {role?.toUpperCase() || 'GUEST'}
              </span>
            </div>

            <h1 className="text-2xl font-semibold text-gray-800 mb-2">
              {user?.displayName || 'Unnamed User'}
            </h1>
            <p className="text-gray-600 flex items-center justify-center gap-2">
              <FaEnvelope className="text-rose-500" />
              {user?.email}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
              >
                <FaEdit />
                Edit Profile
              </button>
              <button
                onClick={() => setIsPasswordModalOpen(true)}
                className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-xl font-medium transition-colors"
              >
                <FaLock />
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
