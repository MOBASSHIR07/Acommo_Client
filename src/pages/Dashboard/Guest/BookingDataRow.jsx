import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-hot-toast';

const BookingDataRow = ({ booking, refetch }) => {
    console.log(booking);
  const axiosSecure = useAxiosSecure();

  const handleCancel = async () => {
    try {
      await axiosSecure.delete(`/bookings/${booking._id}`);
      toast.success('Booking cancelled successfully!');
      refetch();
    } catch (err) {
      toast.error('Failed to cancel booking.');
    }
  };

  return (
    <tr>
      <td className="px-6 py-4">
        <Link
          to={`/room/${booking.roomId}`}
          className="text-blue-600 font-medium hover:underline"
        >
          {booking.title}
        </Link>
      </td>
      <td className="px-6 py-4">{booking.guest?.name || 'N/A'}</td>
      <td className="px-6 py-4">${booking.price}</td>
      <td className="px-6 py-4">
        {new Date(booking.from).toLocaleDateString()} -{' '}
        {new Date(booking.to).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 text-right">
        <button
          onClick={handleCancel}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          <FaTrash className="inline mr-1" /> Cancel
        </button>
      </td>
    </tr>
  );
};

export default BookingDataRow;
