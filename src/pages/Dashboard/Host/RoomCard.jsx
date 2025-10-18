import { FaMapMarkerAlt, FaDollarSign, FaUsers, FaBed, FaBath, FaEdit, FaTrash } from 'react-icons/fa';

const RoomCard = ({ room, onEdit, onDelete, isDeleting }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="h-48 overflow-hidden">
        <img
          src={room.image_url}
          alt={room.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title and Location */}
        <h3 className="font-semibold text-lg text-gray-800 mb-2 truncate">
          {room.title}
        </h3>
        <div className="flex items-center text-gray-600 mb-3">
          <FaMapMarkerAlt className="text-rose-500 mr-1 text-sm" />
          <span className="text-sm truncate">{room.location}</span>
        </div>

        {/* Room Details */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <FaUsers className="mr-1 text-rose-500" />
              <span>{room.total_guest} guests</span>
            </div>
            <div className="flex items-center">
              <FaBed className="mr-1 text-rose-500" />
              <span>{room.bedrooms} beds</span>
            </div>
            <div className="flex items-center">
              <FaBath className="mr-1 text-rose-500" />
              <span>{room.bathrooms} baths</span>
            </div>
          </div>
        </div>

        {/* Price and Category */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-lg font-semibold text-rose-600">
            <FaDollarSign className="mt-1" />
            <span>{room.price}</span>
            <span className="text-sm font-normal text-gray-600 ml-1">/ night</span>
          </div>
          <span className="px-2 py-1 bg-rose-100 text-rose-700 text-xs rounded-full">
            {room.category}
          </span>
        </div>

        {/* Availability Status */}
        {room.availability && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600">
              Available: {new Date(room.availability.startDate).toLocaleDateString()} - {new Date(room.availability.endDate).toLocaleDateString()}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button 
            onClick={() => onEdit(room)}
            className="flex-1 bg-rose-500 text-white py-2 px-4 rounded-lg hover:bg-rose-600 transition-colors flex items-center justify-center gap-2"
          >
            <FaEdit className="text-sm" />
            Edit
          </button>
          <button 
            onClick={() => onDelete(room._id)}
            disabled={isDeleting}
            className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <FaTrash className="text-sm" />
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;