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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-[2rem] bg-white p-10 text-left align-middle shadow-2xl transition-all border border-[#EAD3D2]">
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-black text-center text-rose-500 uppercase tracking-tighter mb-8"
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
                      className="w-full px-4 py-4 border-2 border-[#EAD3D2] rounded-2xl focus:outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 transition-all duration-300 font-medium text-[#261817]"
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
                      className="w-full text-sm border-2 border-[#EAD3D2] rounded-2xl p-3 focus:outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 transition-all duration-300"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 py-4 px-6 bg-[#FFF0EF] text-rose-500 rounded-xl hover:bg-[#EAD3D2]/50 transition-all duration-300 font-bold uppercase text-xs tracking-widest border border-[#EAD3D2]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={updating}
                      className="flex-1 py-4 px-6 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-xl hover:scale-105 active:scale-95 transition-all duration-300 font-bold uppercase text-xs tracking-widest shadow-lg shadow-rose-500/25 disabled:opacity-50"
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