import PropTypes from 'prop-types'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { FaLock, FaEnvelope, FaSpinner } from 'react-icons/fa'

const ChangePasswordModal = ({ isOpen, closeModal, onReset, user, isLoading }) => {
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
                <Dialog.Title className="text-2xl font-bold text-center bg-gradient-to-r from-rose-600 to-pink-700 bg-clip-text text-transparent mb-6">
                  Change Password
                </Dialog.Title>

                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    {isLoading ? (
                      <FaSpinner className="text-2xl text-rose-500 animate-spin" />
                    ) : (
                      <FaLock className="text-2xl text-rose-500" />
                    )}
                  </div>
                  <p className="text-gray-600 mb-4">
                    We'll send a password reset link to:
                  </p>
                  <div className="flex items-center justify-center gap-2 bg-rose-50 rounded-xl p-3">
                    <FaEnvelope className="text-rose-500" />
                    <p className="font-semibold text-gray-800">{user?.email}</p>
                  </div>
                  <p className="text-sm text-gray-500 mt-3">
                    Check your inbox and spam folder for the reset link
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={closeModal}
                    disabled={isLoading}
                    className="flex-1 py-3 px-6 bg-gray-200 text-gray-700 rounded-2xl hover:bg-gray-300 transition-colors duration-300 font-semibold disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={onReset}
                    disabled={isLoading}
                    className="flex-1 py-3 px-6 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-2xl hover:from-rose-600 hover:to-pink-700 transition-all duration-300 font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Send Reset Link'
                    )}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

ChangePasswordModal.propTypes = {
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  onReset: PropTypes.func,
  user: PropTypes.object,
  isLoading: PropTypes.bool,
}

export default ChangePasswordModal
