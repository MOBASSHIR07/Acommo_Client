import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { FaCalendarAlt, FaHome } from 'react-icons/fa';

const ManageBooking = () => {
  const axiosSecure = useAxiosSecure();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['all-bookings'],
    queryFn: async () => {
      const res = await axiosSecure.get('/bookings');
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <div className="p-3 bg-rose-100 rounded-2xl">
            <FaHome className="text-2xl text-rose-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Bookings</h1>
            <p className="text-gray-600 mt-1">All reservations overview</p>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">All Bookings</h2>
            <div className="text-sm text-gray-500 mt-1">
              Total Bookings: {bookings.length}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Room Title
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Guest
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Dates
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <Link
                          to={`/room/${booking.roomId}`}
                          className="text-blue-600 font-medium hover:underline"
                        >
                          {booking.title}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {booking.guest?.name || booking.guestEmail || 'Guest'}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                        ${booking.price}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <FaCalendarAlt className="w-4 h-4 text-gray-400" />
                          {new Date(booking.from).toLocaleDateString()} -{' '}
                          {new Date(booking.to).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="inline-flex items-center gap-2 px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-medium transition-all duration-200 shadow-sm">
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <FaCalendarAlt className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings found</h3>
                      <p className="text-gray-500">There are no bookings to manage at the moment.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageBooking;
