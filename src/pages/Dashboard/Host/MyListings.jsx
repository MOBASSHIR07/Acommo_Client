import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from "../../../hooks/useAuth";
import useAxiosCommon from '../../../hooks/useAxiosCommon';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { toast } from 'react-hot-toast';
import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import EditRoomModal from './EditRoomModal';
import RoomCard from './RoomCard';
import { FaExclamationTriangle, FaTrash } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyListings = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()
    const queryClient = useQueryClient();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingRoom, setEditingRoom] = useState(null);
    const [deleteRoom, setDeleteRoom] = useState(null);
    const [editFormData, setEditFormData] = useState({});

    // Fetch rooms
    const { data: rooms = [], isLoading } = useQuery({
        queryKey: ['myRooms', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-rooms/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });

    // Delete mutation
    const deleteMutation = useMutation({
        mutationFn: async (roomId) => {
            const res = await axiosSecure.delete(`/room/${roomId}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['myRooms', user?.email]);
            setIsDeleteModalOpen(false);
            setDeleteRoom(null);
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
            // Convert price to number before sending to API
            const dataToSend = {
                ...updatedData,
                price: Number(updatedData.price)
            };
            const res = await axiosSecure.put(`/room/${roomId}`, dataToSend);
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

    // Calculate statistics
    const stats = {
        totalListings: rooms.length,
        activeListings: rooms.filter(room => room.availability?.startDate).length,
        totalValue: rooms.reduce((total, room) => total + (Number(room.price) || 0), 0),
        totalCapacity: rooms.reduce((total, room) => total + (Number(room.total_guest) || 0), 0)
    };

    // Handle delete start
    const handleDeleteStart = (room) => {
        setDeleteRoom(room);
        setIsDeleteModalOpen(true);
    };

    // Handle delete confirm
    const handleDeleteConfirm = () => {
        if (deleteRoom) {
            deleteMutation.mutate(deleteRoom._id);
        }
    };

    // Handle delete cancel
    const handleDeleteCancel = () => {
        setIsDeleteModalOpen(false);
        setDeleteRoom(null);
    };

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
                endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
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

    // Handle input change - ensure numbers are converted
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        // Convert numeric fields to numbers
        const processedValue = ['price', 'total_guest', 'bedrooms', 'bathrooms'].includes(name) 
            ? Number(value) 
            : value;

        setEditFormData(prev => ({
            ...prev,
            [name]: processedValue
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
                            <div className="text-2xl font-bold text-rose-500">{stats.totalListings}</div>
                            <div className="text-gray-600">Total Listings</div>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                            <div className="text-2xl font-bold text-green-500">
                                {stats.activeListings}
                            </div>
                            <div className="text-gray-600">Active Listings</div>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                            <div className="text-2xl font-bold text-blue-500">
                                ${stats.totalValue.toLocaleString()}
                            </div>
                            <div className="text-gray-600">Total Value</div>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                            <div className="text-2xl font-bold text-purple-500">
                                {stats.totalCapacity}
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
                                    onDelete={handleDeleteStart}
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

            {/* Delete Confirmation Modal */}
            <Transition appear show={isDeleteModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={handleDeleteCancel}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                                <FaExclamationTriangle className="text-red-600 text-xl" />
                                            </div>
                                        </div>
                                        <div>
                                            <Dialog.Title as="h3" className="text-lg font-semibold text-gray-900">
                                                Delete Listing
                                            </Dialog.Title>
                                            <p className="text-sm text-gray-500">
                                                This action cannot be undone
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <p className="text-gray-600">
                                            Are you sure you want to delete <span className="font-semibold text-gray-900">{deleteRoom?.title}</span>? 
                                            This will permanently remove the listing and all its data.
                                        </p>
                                    </div>

                                    <div className="mt-6 flex gap-3">
                                        <button
                                            type="button"
                                            onClick={handleDeleteCancel}
                                            className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleDeleteConfirm}
                                            disabled={deleteMutation.isLoading}
                                            className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                        >
                                            <FaTrash className="text-sm" />
                                            {deleteMutation.isLoading ? 'Deleting...' : 'Delete'}
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default MyListings;