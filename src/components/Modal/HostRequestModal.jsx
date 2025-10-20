import PropTypes from 'prop-types'
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogTitle,
  DialogPanel,
} from '@headlessui/react'
import { Fragment } from 'react'
import { FaHome, FaCheckCircle, FaTimes } from 'react-icons/fa'

const HostRequestModal = ({ closeModal, isOpen, modalHandler }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm' />
        </TransitionChild>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <DialogPanel className='w-full max-w-lg transform overflow-hidden rounded-3xl bg-gradient-to-br from-white to-gray-50 p-8 text-left align-middle shadow-2xl transition-all border border-gray-100'>
                {/* Header */}
                <div className='flex items-center justify-center mb-6'>
                  <div className='w-16 h-16 bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg'>
                    <FaHome className='text-2xl text-white' />
                  </div>
                </div>

                <DialogTitle
                  as='h3'
                  className='text-2xl font-bold text-center bg-gradient-to-r from-rose-600 to-pink-700 bg-clip-text text-transparent mb-4'
                >
                  Become A Host!
                </DialogTitle>

                <div className='mt-4'>
                  <p className='text-gray-600 text-center text-lg mb-6'>
                    Welcome to our hosting community! Please review the terms before proceeding.
                  </p>

                  {/* Features List */}
                  <div className='bg-rose-50 rounded-2xl p-6 mb-6 border border-rose-100'>
                    <h4 className='font-semibold text-gray-800 mb-4 flex items-center gap-2'>
                      <FaCheckCircle className='text-rose-500' />
                      What you'll get:
                    </h4>
                    <ul className='space-y-3 text-sm text-gray-600'>
                      <li className='flex items-center gap-3'>
                        <div className='w-2 h-2 bg-rose-400 rounded-full'></div>
                        <span>Reach thousands of potential guests</span>
                      </li>
                      <li className='flex items-center gap-3'>
                        <div className='w-2 h-2 bg-rose-400 rounded-full'></div>
                        <span>Set your own pricing and availability</span>
                      </li>
                      <li className='flex items-center gap-3'>
                        <div className='w-2 h-2 bg-rose-400 rounded-full'></div>
                        <span>24/7 customer support</span>
                      </li>
                      <li className='flex items-center gap-3'>
                        <div className='w-2 h-2 bg-rose-400 rounded-full'></div>
                        <span>Secure payment processing</span>
                      </li>
                    </ul>
                  </div>

                  {/* Terms Notice */}
                  <div className='bg-blue-50 rounded-xl p-4 border border-blue-200 mb-6'>
                    <p className='text-sm text-blue-700 text-center'>
                      📝 By continuing, you agree to our{' '}
                      <button className='underline font-medium hover:text-blue-800 transition-colors'>
                        Terms of Service
                      </button>{' '}
                      and{' '}
                      <button className='underline font-medium hover:text-blue-800 transition-colors'>
                        Privacy Policy
                      </button>
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className='flex gap-4 mt-8'>
                  <button
                    onClick={closeModal}
                    type='button'
                    className='flex-1 py-4 px-6 text-gray-700 bg-white border-2 border-gray-300 rounded-2xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-semibold flex items-center justify-center gap-2 shadow-sm hover:shadow-md'
                  >
                    <FaTimes className='text-lg' />
                    Cancel
                  </button>
                  <button
                    onClick={modalHandler}
                    type='button'
                    className='flex-1 py-4 px-6 text-white bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl hover:from-rose-600 hover:to-pink-700 transition-all duration-200 font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
                  >
                    <FaCheckCircle className='text-lg' />
                    Continue
                  </button>
                </div>

                {/* Footer Note */}
                <div className='mt-6 text-center'>
                  <p className='text-xs text-gray-500'>
                    You can update your hosting preferences anytime in settings
                  </p>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

HostRequestModal.propTypes = {
  closeModal: PropTypes.func,
  isOpen: PropTypes.bool,
  modalHandler: PropTypes.func
}

export default HostRequestModal