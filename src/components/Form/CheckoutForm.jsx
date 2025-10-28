import { useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

import { toast } from 'react-hot-toast'
import useAxiosSecure from '../../hooks/useAxiosSecure'

const CheckoutForm = ({ bookingInfo, closeModal }) => {
  const stripe = useStripe()
  const elements = useElements()
  const axiosSecure = useAxiosSecure()
  const [error, setError] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [succeeded, setSucceeded] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setProcessing(true)
    setError(null)

    try {
      // Step 1: Create PaymentIntent from backend
      const { data } = await axiosSecure.post('/create-payment-intent', {
        price: bookingInfo.price,
      })

      const clientSecret = data.clientSecret

      // Step 2: Confirm Payment
      const { error: confirmError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: bookingInfo?.guest?.name,
              email: bookingInfo?.guest?.email,
            },
          },
        })

      if (confirmError) {
        setError(confirmError.message)
        setProcessing(false)
        return
      }

      if (paymentIntent.status === 'succeeded') {
        setSucceeded(true)
        toast.success('Payment successful! Booking confirmed.')
        closeModal()
      }
    } catch (err) {
      console.error(err)
      setError('Something went wrong. Please try again.')
    } finally {
      setProcessing(false)
    }
  }

  const cardStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Inter, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': { color: '#aab7c4' },
      },
      invalid: { color: '#fa755a', iconColor: '#fa755a' },
    },
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div className='p-3 border rounded-md bg-white shadow-sm'>
        <CardElement options={cardStyle} />
      </div>

      {error && <p className='text-red-500 text-sm text-center'>{error}</p>}
      {succeeded && (
        <p className='text-green-600 text-sm text-center'>
          ✅ Payment successful!
        </p>
      )}

      <button
        type='submit'
        disabled={!stripe || processing || succeeded}
        className='w-full py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition font-medium disabled:opacity-60'
      >
        {processing ? 'Processing...' : `Pay $${bookingInfo?.price}`}
      </button>
    </form>
  )
}

export default CheckoutForm
