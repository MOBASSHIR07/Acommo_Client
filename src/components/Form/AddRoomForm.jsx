import { categories } from '../Categories/CategoriesData'
import {
    FaMapMarkerAlt,
    FaTag,
    FaDollarSign,
    FaUsers,
    FaBed,
    FaBath,
    FaUpload,
    FaCalendarAlt,
    FaStar
} from 'react-icons/fa'
import { FiHome, FiCamera } from 'react-icons/fi'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { useState } from 'react'
import { TbFidgetSpinner } from 'react-icons/tb'

const AddRoomForm = ({ handleDates, dates, handleSubmit, loading }) => {
    const [previewImage, setPreviewImage] = useState(null)

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setPreviewImage(URL.createObjectURL(file))
        }
    }
    return (
        <div className='min-h-screen bg-gradient-to-br from-rose-50 via-white to-rose-100 py-8 px-4'>
            <div className='max-w-6xl mx-auto'>
                {/* Header */}
                <div className='text-center mb-12'>
                    <div className='inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl shadow-lg mb-4'>
                        <FiHome className='text-3xl text-white' />
                    </div>
                    <h1 className='text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-700 bg-clip-text text-transparent mb-3'>
                        List Your Space
                    </h1>
                    <p className='text-gray-600 text-lg max-w-2xl mx-auto'>
                        Share your unique space with travelers worldwide and start earning
                        today
                    </p>
                </div>

                {/* Main Card */}
                <div className='bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/60 overflow-hidden'>
                    {/* Progress Bar */}
                    <div className='bg-gradient-to-r from-rose-500 to-pink-600 p-1'>
                        <div className='h-1 bg-white/30 rounded-full'>
                            <div className='h-full bg-white w-1/3 rounded-full transition-all duration-500'></div>
                        </div>
                    </div>

                    <div className='p-8'>
                        <form onSubmit={handleSubmit} className='space-y-8'>
                            {/* Grid layout */}
                            <div className='grid grid-cols-1 xl:grid-cols-2 gap-12'>
                                {/* Left column */}
                                <div className='space-y-8'>
                                    {/* Location */}
                                    <div className='group'>
                                        <label
                                            htmlFor='location'
                                            className='block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide'
                                        >
                                            <FaMapMarkerAlt className='inline-block mr-2 text-rose-500' />
                                            Location
                                        </label>
                                        <input
                                            id='location'
                                            name='location'
                                            type='text'
                                            placeholder='Enter your property address'
                                            className='w-full px-6 py-4 border-2 border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:border-rose-400 focus:ring-4 focus:ring-rose-100 transition-all duration-300 bg-white/50 backdrop-blur-sm group-hover:border-rose-300'
                                            required
                                        />
                                    </div>

                                    {/* Category */}
                                    <div className='group'>
                                        <label
                                            htmlFor='category'
                                            className='block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide'
                                        >
                                            <FaTag className='inline-block mr-2 text-rose-500' />
                                            Category
                                        </label>
                                        <select
                                            id='category'
                                            name='category'
                                            className='w-full px-6 py-4 border-2 border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:border-rose-400 focus:ring-4 focus:ring-rose-100 transition-all duration-300 bg-white/50 backdrop-blur-sm appearance-none group-hover:border-rose-300'
                                            required
                                        >
                                            <option value=''>Choose property type</option>
                                            {categories.map(category => (
                                                <option key={category.label} value={category.label}>
                                                    {category.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Date Range Picker */}
                                    <div className='group'>
                                        <label className='block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide'>
                                            <FaCalendarAlt className='inline-block mr-2 text-rose-500' />
                                            Availability
                                        </label>
                                        <div className='bg-white border-2 border-gray-200 rounded-2xl p-6 transition-all duration-300 group-hover:border-rose-300 group-hover:shadow-md'>
                                            <DateRange
                                                editableDateInputs={true}
                                                moveRangeOnFirstSelection={false}
                                                onChange={item => handleDates(item)}
                                                ranges={dates}
                                                rangeColors={['#fb7185']}
                                                className='w-full'
                                            />

                                        </div>
                                    </div>
                                </div>

                                {/* Right column */}
                                <div className='space-y-8'>
                                    {/* Title */}
                                    <div className='group'>
                                        <label
                                            htmlFor='title'
                                            className='block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide'
                                        >
                                            Title
                                        </label>
                                        <input
                                            id='title'
                                            name='title'
                                            type='text'
                                            placeholder='Catchy title for your property'
                                            className='w-full px-6 py-4 border-2 border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:border-rose-400 focus:ring-4 focus:ring-rose-100 transition-all duration-300 bg-white/50 backdrop-blur-sm group-hover:border-rose-300'
                                            required
                                        />
                                    </div>

                                    {/* Image upload */}
                                    {/* Image upload */}
                                    <div className='group'>
                                        <label className='block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide'>
                                            <FiCamera className='inline-block mr-2 text-rose-500' />
                                            Photos
                                        </label>

                                        <div
                                            className='border-2 border-dashed rounded-2xl p-8 border-rose-200 bg-rose-50/50 group-hover:border-rose-300 group-hover:bg-rose-50 transition-all duration-300 cursor-pointer text-center relative'
                                            onClick={() => document.getElementById('image')?.click()}
                                        >
                                            {/* ✅ Preview area */}
                                            {previewImage ? (
                                                <div className='relative w-full flex justify-center'>
                                                    <img
                                                        src={previewImage}
                                                        alt='Preview'
                                                        className='w-48 h-48 object-cover rounded-2xl shadow-lg'
                                                    />
                                                    <button
                                                        type='button'
                                                        className='absolute top-2 right-2 bg-rose-600 text-white px-2 py-1 rounded-full text-xs'
                                                        onClick={(e) => {
                                                           
                                                            
                                                            setPreviewImage(null)
                                                            document.getElementById('image').value = ''
                                                        }}
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className='w-20 h-20 bg-gradient-to-r from-rose-400 to-pink-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg mx-auto'>
                                                        <FaUpload className='text-2xl text-white' />
                                                    </div>
                                                    <p className='text-gray-700 font-semibold text-lg mb-2'>
                                                        Upload
                                                    </p>
                                                    <p className='text-gray-500 text-sm mb-4'>
                                                        Click to browse. High-quality images recommended.
                                                    </p>
                                                    <span className='px-6 py-3 bg-white border border-rose-300 text-rose-600 rounded-xl font-medium hover:bg-rose-50 transition-colors duration-200'>
                                                        Choose Files
                                                    </span>
                                                </>
                                            )}

                                            {/* ✅ Hidden file input */}
                                            <input
                                                id='image'
                                                name='image'
                                                type='file'
                                                accept='image/*'
                                                className='hidden'
                                                onChange={handleImageChange}
                                            />
                                        </div>
                                    </div>

                                    {/* Price & Guests */}
                                    <div className='bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-100'>
                                        <h3 className='font-semibold text-gray-800 mb-4 flex items-center'>
                                            <FaStar className='text-rose-500 mr-2' />
                                            Pricing & Capacity
                                        </h3>
                                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                            <div className='space-y-2'>
                                                <label
                                                    htmlFor='price'
                                                    className='block text-gray-700 font-medium text-sm'
                                                >
                                                    <FaDollarSign className='inline-block mr-1 text-rose-500' />
                                                    Price
                                                </label>
                                                <input
                                                    id='price'
                                                    name='price'
                                                    type='number'
                                                    placeholder='0.00'
                                                    className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white'
                                                    required
                                                />
                                            </div>
                                            <div className='space-y-2'>
                                                <label
                                                    htmlFor='guest'
                                                    className='block text-gray-700 font-medium text-sm'
                                                >
                                                    <FaUsers className='inline-block mr-1 text-rose-500' />
                                                    Guests
                                                </label>
                                                <input
                                                    id='guest'
                                                    name='total_guest'
                                                    type='number'
                                                    placeholder='Number of guests'
                                                    className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white'
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bedrooms & Bathrooms */}
                                    <div className='bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-100'>
                                        <h3 className='font-semibold text-gray-800 mb-4'>Details</h3>
                                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                            <div className='space-y-2'>
                                                <label
                                                    htmlFor='bedrooms'
                                                    className='block text-gray-700 font-medium text-sm'
                                                >
                                                    <FaBed className='inline-block mr-1 text-rose-500' />
                                                    Bedrooms
                                                </label>
                                                <input
                                                    id='bedrooms'
                                                    name='bedrooms'
                                                    type='number'
                                                    placeholder='No. of bedrooms'
                                                    className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white'
                                                    required
                                                />
                                            </div>
                                            <div className='space-y-2'>
                                                <label
                                                    htmlFor='bathrooms'
                                                    className='block text-gray-700 font-medium text-sm'
                                                >
                                                    <FaBath className='inline-block mr-1 text-rose-500' />
                                                    Bathrooms
                                                </label>
                                                <input
                                                    id='bathrooms'
                                                    name='bathrooms'
                                                    type='number'
                                                    placeholder='No. of bathrooms'
                                                    className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white'
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className='group'>
                                        <label
                                            htmlFor='description'
                                            className='block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide'
                                        >
                                            Description
                                        </label>
                                        <textarea
                                            id='description'
                                            name='description'
                                            placeholder='Describe what makes your space special...'
                                            className='w-full h-32 px-6 py-4 border-2 border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:border-rose-400 focus:ring-4 focus:ring-rose-100 transition-all duration-300 bg-white/50 backdrop-blur-sm resize-none group-hover:border-rose-300'
                                            required
                                        ></textarea>
                                        <div className='text-right text-sm text-gray-500 mt-2'>
                                            <span>0/500 characters</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Submit button */}
                            <div className='pt-8 border-t border-gray-100'>
                                <button
                                disabled={loading}
                                    type='submit'
                                    className='w-full py-3 text-lg font-semibold text-white rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3'
                                >
                                   {loading ? (
                                                      <TbFidgetSpinner className='animate-spin mx-auto' />
                                                    ) : (
                                                      'Save & Continue'
                                                    )}
                                    <div className='w-2 h-2 bg-white rounded-full animate-pulse'></div>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddRoomForm
