import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { imageUpload } from '../../../api/utils'

const UpdateProfileModal = ({ isOpen, closeModal, user, onSave }) => {
  const [name, setName] = useState(user?.displayName || '')
  const [photo, setPhoto] = useState(null)
  const [updating, setUpdating] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUpdating(true)
    try {
      let photoURL = user?.photoURL
      if (photo) {
        photoURL = await imageUpload(photo)
      }
      await onSave(name, photoURL)
    } catch (error) {
      console.error(error)
    } finally {
      setUpdating(false)
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-3xl bg-white p-8 text-left align-middle shadow-2xl transition-all border border-rose-100">
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-bold text-center bg-gradient-to-r from-rose-600 to-pink-700 bg-clip-text text-transparent mb-6"
                >
                  Update Profile
                </Dialog.Title>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-rose-400 focus:ring-4 focus:ring-rose-100 transition-all duration-300"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Profile Photo
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => setPhoto(e.target.files[0])}
                      className="w-full text-sm border-2 border-gray-200 rounded-2xl p-3 focus:outline-none focus:border-rose-400 focus:ring-4 focus:ring-rose-100 transition-all duration-300"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 py-3 px-6 bg-gray-200 text-gray-700 rounded-2xl hover:bg-gray-300 transition-colors duration-300 font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={updating}
                      className="flex-1 py-3 px-6 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-2xl hover:from-rose-600 hover:to-pink-700 transition-all duration-300 font-semibold disabled:opacity-50"
                    >
                      {updating ? 'Updating...' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

UpdateProfileModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  user: PropTypes.object,
  onSave: PropTypes.func.isRequired,
}

export default UpdateProfileModal