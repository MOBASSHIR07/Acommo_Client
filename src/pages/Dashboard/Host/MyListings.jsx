import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from "../../../hooks/useAuth";
import useAxiosCommon from '../../../hooks/useAxiosCommon';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import EditRoomModal from './EditRoomModal';
import RoomCard from './RoomCard';

const MyListings = () => {
    const { user } = useAuth();
    const axiosCommon = useAxiosCommon();
    const queryClient = useQueryClient();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingRoom, setEditingRoom] = useState(null);
    const [editFormData, setEditFormData] = useState({});

    // Fetch rooms
    const { data: rooms = [], isLoading } = useQuery({
        queryKey: ['myRooms', user?.email],
        queryFn: async () => {
            const res = await axiosCommon.get(`/my-rooms/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });

    // Delete mutation
    const deleteMutation = useMutation({
        mutationFn: async (roomId) => {
            const res = await axiosCommon.delete(`/room/${roomId}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['myRooms', user?.email]);
            toast.success('Room deleted successfully!');
        },
        onError: (error) => {
            toast.error('Failed to delete room');
            console.error('Delete error:', error);
        }
    });

    // Update mutation
    const updateMutation = useMutation({
        mutationFn: async ({ roomId, updatedData }) => {
            const res = await axiosCommon.put(`/room/${roomId}`, updatedData);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['myRooms', user?.email]);
            setIsEditModalOpen(false);
            setEditingRoom(null);
            setEditFormData({});
            toast.success('Room updated successfully!');
        },
        onError: (error) => {
            toast.error('Failed to update room');
            console.error('Update error:', error);
        }
    });

    // Handle delete
    const handleDelete = (roomId) => {
        if (window.confirm('Are you sure you want to delete this listing?')) {
            deleteMutation.mutate(roomId);
        }
    };

    // Handle edit start
   // Handle edit start
const handleEditStart = (room) => {
  setEditingRoom(room);
  setEditFormData({
    title: room.title,
    location: room.location,
    category: room.category,
    price: room.price,
    total_guest: room.total_guest,
    bedrooms: room.bedrooms,
    bathrooms: room.bathrooms,
    description: room.description,
    image_url: room.image_url,
    availability: room.availability || {
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // +7 days
    }
  });
  setIsEditModalOpen(true);
};

    // Handle edit cancel
    const handleEditCancel = () => {
        setIsEditModalOpen(false);
        setEditingRoom(null);
        setEditFormData({});
    };

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle save edit
    const handleSaveEdit = () => {
        if (editingRoom) {
            updateMutation.mutate({ roomId: editingRoom._id, updatedData: editFormData });
        }
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <>
            <div className="min-h-screen bg-gray-50 py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Listings</h1>
                        <p className="text-gray-600">Manage your property listings</p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                            <div className="text-2xl font-bold text-rose-500">{rooms.length}</div>
                            <div className="text-gray-600">Total Listings</div>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                            <div className="text-2xl font-bold text-green-500">
                                {rooms.filter(room => room.availability?.startDate).length}
                            </div>
                            <div className="text-gray-600">Active Listings</div>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                            <div className="text-2xl font-bold text-blue-500">
                                ${rooms.reduce((total, room) => total + (room.price || 0), 0)}
                            </div>
                            <div className="text-gray-600">Total Value</div>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                            <div className="text-2xl font-bold text-purple-500">
                                {rooms.reduce((total, room) => total + (room.total_guest || 0), 0)}
                            </div>
                            <div className="text-gray-600">Total Capacity</div>
                        </div>
                    </div>

                    {/* Rooms Grid */}
                    {rooms.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-gray-400 text-6xl mb-4">🏠</div>
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">No listings found</h3>
                            <p className="text-gray-500">You haven't created any property listings yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {rooms.map(room => (
                                <RoomCard
                                    key={room._id}
                                    room={room}
                                    onEdit={handleEditStart}
                                    onDelete={handleDelete}
                                    isDeleting={deleteMutation.isLoading}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Edit Modal */}
            <EditRoomModal
                isOpen={isEditModalOpen}
                onClose={handleEditCancel}
                room={editingRoom}
                editFormData={editFormData}
                onInputChange={handleInputChange}
                onSave={handleSaveEdit}
                isLoading={updateMutation.isLoading}
            />
        </>
    );
};

export default MyListings;