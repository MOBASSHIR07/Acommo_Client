import { useQuery } from '@tanstack/react-query';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaCalendarAlt, FaDollarSign, FaHome, FaUsers, FaChartLine, FaClock } from "react-icons/fa";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { useState } from 'react';

const AdminStatistic = () => {
  const axiosSecure = useAxiosSecure();
  const [dateRangeState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const { data: statistics, isLoading, error } = useQuery({
    queryKey: ['admin-statistics'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/admin-statistics');
      return data;
    },
    retry: 1
  });

  // Format monthly data for chart dynamically
  const formatChartData = (monthlyData = []) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    if (!monthlyData || monthlyData.length === 0) {
      return monthNames.slice(0, 6).map((month, index) => ({
        month,
        bookings: 0,
        revenue: 0
      }));
    }

    return monthlyData.map(item => ({
      month: monthNames[item.month - 1] || `Month ${item.month}`,
      bookings: item.bookings || 0,
      revenue: item.revenue || 0
    }));
  };

  const chartData = formatChartData(statistics?.monthlyData);

  // Empty function to prevent any onChange calls
  const handleDateChange = () => {
    // Do nothing - completely prevent any date changes
    return;
  };

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FaCalendarAlt className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to load statistics</h3>
          <p className="text-gray-500">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <div className="p-2 sm:p-3 bg-rose-100 rounded-xl sm:rounded-2xl">
            <FaCalendarAlt className="text-xl sm:text-2xl text-rose-600" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Statistics</h1>
            <p className="text-gray-600 text-sm sm:text-base mt-1">
              Real-time platform performance and bookings
            </p>
          </div>
        </div>

        {/* Statistic Cards */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
          <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-500">Total Bookings</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                {statistics?.totalBookings || 0}
              </p>
            </div>
            <div className="p-2 sm:p-3 bg-blue-50 rounded-lg sm:rounded-xl">
              <FaCalendarAlt className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-500">Total Sales</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                ${(statistics?.totalRevenue || 0).toLocaleString()}
              </p>
            </div>
            <div className="p-2 sm:p-3 bg-green-50 rounded-lg sm:rounded-xl">
              <FaDollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-500">Active Listings</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                {statistics?.totalRooms || 0}
              </p>
            </div>
            <div className="p-2 sm:p-3 bg-rose-50 rounded-lg sm:rounded-xl">
              <FaHome className="w-5 h-5 sm:w-6 sm:h-6 text-rose-500" />
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-500">Total Users</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                {statistics?.totalUsers || 0}
              </p>
            </div>
            <div className="p-2 sm:p-3 bg-yellow-50 rounded-lg sm:rounded-xl">
              <FaUsers className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
            </div>
          </div>
        </div>

        {/* Line Chart + Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Chart */}
          <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
              Monthly Bookings & Revenue
            </h2>
            <div className="h-64 sm:h-72 lg:h-80 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#6b7280" 
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#6b7280" 
                    fontSize={12}
                  />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'revenue' ? `$${value}` : value,
                      name === 'revenue' ? 'Revenue' : 'Bookings'
                    ]}
                  />
                  <Line
                    type="monotone"
                    dataKey="bookings"
                    stroke="#f43f5e"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Bookings"
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Revenue"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Calendar - Completely Non-interactive */}
          <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
              Today's Date
            </h2>
            <div className="flex justify-center">
              <div className="relative">
                {/* Invisible overlay that blocks all clicks */}
                <div 
                  className="absolute inset-0 z-50 cursor-not-allowed" 
                  style={{ 
                    pointerEvents: 'all',
                    backgroundColor: 'transparent'
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                />
                <DateRange
                  editableDateInputs={false}
                  moveRangeOnFirstSelection={false}
                  ranges={dateRangeState}
                  onChange={handleDateChange}
                  showSelectionPreview={false}
                  showDateDisplay={true}
                  showMonthAndYearPickers={false}
                  rangeColors={["#f43f5e"]}
                  disabled={true}
                  className="w-full max-w-xs"
                  dateDisplayFormat="MMMM d, yyyy"
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 text-center mt-3">
              Current date (view only)
            </p>
          </div>
        </div>

        {/* Additional Metrics - Removed Occupancy Rate and Conversion Rate */}
        <div className="mt-6 sm:mt-8 bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
            Performance Metrics
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <FaChartLine className="w-4 h-4 text-rose-500" />
                <p className="font-medium text-gray-700">Avg. Booking Value</p>
              </div>
              <p className="text-lg font-bold text-rose-600">
                ${statistics?.totalBookings ? Math.round(statistics.totalRevenue / statistics.totalBookings) : 0}
              </p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <FaClock className="w-4 h-4 text-purple-500" />
                <p className="font-medium text-gray-700">Last Updated</p>
              </div>
              <p className="text-lg font-bold text-purple-600">
                {new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStatistic;