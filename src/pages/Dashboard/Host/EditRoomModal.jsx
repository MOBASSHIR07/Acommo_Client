import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FaDollarSign, FaUpload, FaMapMarkerAlt, FaTag, FaUsers, FaBed, FaBath, FaCalendarAlt } from 'react-icons/fa';
import { categories } from "../../../components/Categories/CategoriesData";
import { imageUpload } from '../../../api/utils';

const EditRoomModal = ({ 
  isOpen, 
  onClose, 
  room, 
  editFormData, 
  onInputChange, 
  onSave, 
  isLoading 
}) => {
  const [imageUploading, setImageUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(editFormData.image_url || '');

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUploading(true);
      try {
        const imageUrl = await imageUpload(file);
        onInputChange({ target: { name: 'image_url', value: imageUrl } });
        setImagePreview(imageUrl);
      } catch (error) {
        console.error('Image upload failed:', error);
      } finally {
        setImageUploading(false);
      }
    }
  };

  // Handle date change
  const handleDateChange = (field, value) => {
    onInputChange({ 
      target: { 
        name: 'availability', 
        value: {
          ...editFormData.availability,
          [field]: value
        }
      } 
    });
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
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
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all max-h-[90vh] overflow-y-auto">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-semibold leading-6 text-gray-900 mb-6"
                >
                  Edit Listing
                </Dialog.Title>

                <div className="mt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                      {/* Title */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Title
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={editFormData.title || ''}
                          onChange={onInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                          placeholder="Property title"
                        />
                      </div>

                      {/* Location */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <FaMapMarkerAlt className="inline-block mr-2 text-rose-500" />
                          Location
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={editFormData.location || ''}
                          onChange={onInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                          placeholder="Property location"
                        />
                      </div>

                      {/* Category */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <FaTag className="inline-block mr-2 text-rose-500" />
                          Category
                        </label>
                        <select
                          name="category"
                          value={editFormData.category || ''}
                          onChange={onInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                        >
                          <option value="">Select Category</option>
                          {categories.map(category => (
                            <option key={category.label} value={category.label}>
                              {category.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Price */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <FaDollarSign className="inline-block mr-2 text-rose-500" />
                          Price per night
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            name="price"
                            value={editFormData.price || ''}
                            onChange={onInputChange}
                            className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                            placeholder="0.00"
                          />
                          <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                      </div>

                      {/* Capacity & Rooms */}
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <FaUsers className="inline-block mr-1 text-rose-500" />
                            Guests
                          </label>
                          <input
                            type="number"
                            name="total_guest"
                            value={editFormData.total_guest || ''}
                            onChange={onInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                            placeholder="Guests"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <FaBed className="inline-block mr-1 text-rose-500" />
                            Bedrooms
                          </label>
                          <input
                            type="number"
                            name="bedrooms"
                            value={editFormData.bedrooms || ''}
                            onChange={onInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                            placeholder="Bedrooms"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <FaBath className="inline-block mr-1 text-rose-500" />
                            Bathrooms
                          </label>
                          <input
                            type="number"
                            name="bathrooms"
                            value={editFormData.bathrooms || ''}
                            onChange={onInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                            placeholder="Bathrooms"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      {/* Image Upload */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Property Image
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-rose-400 transition-colors">
                          <label className="cursor-pointer">
                            {imagePreview ? (
                              <div className="relative">
                                <img 
                                  src={imagePreview} 
                                  alt="Preview" 
                                  className="w-full h-32 object-cover rounded-lg mb-2"
                                />
                                <div className="text-sm text-gray-600">Click to change image</div>
                              </div>
                            ) : (
                              <div className="py-4">
                                <FaUpload className="text-2xl text-gray-400 mx-auto mb-2" />
                                <div className="text-sm text-gray-600">
                                  {imageUploading ? 'Uploading...' : 'Click to upload image'}
                                </div>
                              </div>
                            )}
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                              disabled={imageUploading}
                            />
                          </label>
                        </div>
                      </div>

                      {/* Availability Dates */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <FaCalendarAlt className="inline-block mr-2 text-rose-500" />
                          Availability Dates
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Start Date</label>
                            <input
                              type="date"
                              value={editFormData.availability?.startDate ? new Date(editFormData.availability.startDate).toISOString().split('T')[0] : ''}
                              onChange={(e) => handleDateChange('startDate', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">End Date</label>
                            <input
                              type="date"
                              value={editFormData.availability?.endDate ? new Date(editFormData.availability.endDate).toISOString().split('T')[0] : ''}
                              onChange={(e) => handleDateChange('endDate', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          name="description"
                          value={editFormData.description || ''}
                          onChange={onInputChange}
                          rows="6"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 resize-none"
                          placeholder="Describe your property, amenities, and what makes it special..."
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex space-x-4">
                  <button
                    type="button"
                    onClick={onSave}
                    disabled={isLoading || imageUploading}
                    className="flex-1 bg-rose-500 text-white py-3 px-6 rounded-lg hover:bg-rose-600 transition-colors disabled:opacity-50 font-medium"
                  >
                    {isLoading ? 'Saving Changes...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditRoomModal;