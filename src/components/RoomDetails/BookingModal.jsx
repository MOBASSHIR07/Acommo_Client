import PropTypes from 'prop-types'
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { format } from 'date-fns'
import { Fragment } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from '../Form/CheckoutForm'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_Pk)

const BookingModal = ({ closeModal, isOpen, bookingInfo }) => {
  if (!bookingInfo) return null

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={closeModal}>
        {/* Backdrop */}
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/40 backdrop-blur-sm' />
        </TransitionChild>

        {/* Modal */}
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
              <DialogPanel className='w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <DialogTitle
                  as='h3'
                  className='text-xl font-semibold text-center text-gray-900 mb-4'
                >
                  Review Your Booking
                </DialogTitle>

                {/* Booking Summary */}
                <div className='bg-rose-50 p-4 rounded-lg border border-rose-100'>
                  <p className='text-sm text-gray-800'>
                    <span className='font-medium text-gray-900'>Room:</span>{' '}
                    {bookingInfo.title}
                  </p>
                  <p className='text-sm text-gray-800'>
                    <span className='font-medium text-gray-900'>Location:</span>{' '}
                    {bookingInfo.location}
                  </p>
                  <p className='text-sm text-gray-800'>
                    <span className='font-medium text-gray-900'>Host:</span>{' '}
                    {bookingInfo?.host?.name}
                  </p>
                  <p className='text-sm text-gray-800'>
                    <span className='font-medium text-gray-900'>Guest:</span>{' '}
                    {bookingInfo?.guest?.name}
                  </p>
                  <p className='text-sm text-gray-800'>
                    <span className='font-medium text-gray-900'>From:</span>{' '}
                    {format(new Date(bookingInfo.from), 'PP')} –{' '}
                    <span className='font-medium text-gray-900'>To:</span>{' '}
                    {format(new Date(bookingInfo.to), 'PP')}
                  </p>
                  <p className='text-sm text-gray-800'>
                    <span className='font-medium text-gray-900'>Total:</span>{' '}
                    ${bookingInfo.price}
                  </p>
                </div>

                {/* Stripe Checkout */}
                <div className='mt-6'>
                  <h4 className='font-semibold text-gray-800 mb-2 text-center'>
                    Complete Payment
                  </h4>
                  <Elements stripe={stripePromise}>
                    <CheckoutForm
                      bookingInfo={bookingInfo}
                      closeModal={closeModal}
                    />
                  </Elements>
                </div>

                {/* Buttons */}
                <div className='mt-6 flex justify-end gap-3'>
                  <button
                    onClick={closeModal}
                    className='px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-100 transition font-medium'
                  >
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

BookingModal.propTypes = {
  bookingInfo: PropTypes.object,
  closeModal: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default BookingModal
