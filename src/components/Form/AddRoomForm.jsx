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
    FaStar,
    FaCheckCircle,
    FaArrowRight,
    FaArrowLeft
} from 'react-icons/fa'
import { FiHome, FiCamera, FiInfo } from 'react-icons/fi'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { useState } from 'react'
import { TbFidgetSpinner } from 'react-icons/tb'
import { motion, AnimatePresence } from 'framer-motion'

const AddRoomForm = ({ handleDates, dates, handleSubmit, loading }) => {
    const [previewImage, setPreviewImage] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState('')

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setPreviewImage(URL.createObjectURL(file))
        }
    }

    return (
        <div className='min-h-screen bg-[#FFF0EF]/30 py-12 px-4 font-sans selection:bg-rose-100'>
            <div className='max-w-6xl mx-auto'>
                {/* Header */}
                <div className='text-center mb-12'>
                    <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-rose-400 to-pink-500 rounded-2xl shadow-lg shadow-rose-500/20 mb-4'>
                        <FiHome className='text-2xl text-white' />
                    </div>
                    <h1 className='text-4xl font-black text-[#261817] uppercase tracking-tighter mb-2'>
                        List Your Property
                    </h1>
                    <p className='text-[#59413F]/60 font-medium'>
                        Showcase your architectural masterpiece to the world.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
                    {/* Left Column: Core Details */}
                    <div className='lg:col-span-7 space-y-6'>
                        <div className='bg-white/80 backdrop-blur-xl rounded-[32px] p-8 shadow-sm border border-white/50 space-y-6'>
                            <h2 className='text-xl font-black text-[#261817] uppercase tracking-tight flex items-center gap-2'>
                                <FiInfo className='text-rose-500' />
                                Essential Details
                            </h2>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <div className='space-y-2'>
                                    <label className='text-[10px] font-black text-rose-500 uppercase tracking-widest ml-1'>Property Title</label>
                                    <input required name='title' placeholder='The Glass House' className='w-full px-5 py-4 bg-white border-2 border-rose-50 rounded-2xl focus:outline-none focus:border-rose-400 transition-all placeholder:text-rose-200 font-medium' />
                                </div>
                                <div className='space-y-2'>
                                    <label className='text-[10px] font-black text-rose-500 uppercase tracking-widest ml-1'>Location</label>
                                    <div className='relative'>
                                        <FaMapMarkerAlt className='absolute left-5 top-1/2 -translate-y-1/2 text-rose-300' />
                                        <input required name='location' placeholder='California, USA' className='w-full pl-12 pr-5 py-4 bg-white border-2 border-rose-50 rounded-2xl focus:outline-none focus:border-rose-400 transition-all placeholder:text-rose-200 font-medium' />
                                    </div>
                                </div>
                            </div>

                            <div className='space-y-3'>
                                <label className='text-[10px] font-black text-rose-500 uppercase tracking-widest ml-1'>Select Category</label>
                                <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2'>
                                    {categories.map((cat) => (
                                        <button
                                            key={cat.label}
                                            type='button'
                                            onClick={() => setSelectedCategory(cat.label)}
                                            className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1 group ${
                                                selectedCategory === cat.label 
                                                ? 'bg-rose-500 border-rose-500 text-white shadow-md' 
                                                : 'bg-white border-rose-50 text-[#59413F] hover:border-rose-200'
                                            }`}
                                        >
                                            <cat.icon size={16} className={selectedCategory === cat.label ? 'text-white' : 'text-rose-400'} />
                                            <span className='text-[9px] font-bold uppercase tracking-tighter truncate w-full text-center'>{cat.label}</span>
                                        </button>
                                    ))}
                                </div>
                                <input type='hidden' name='category' value={selectedCategory} required />
                            </div>

                            <div className='space-y-2'>
                                <label className='text-[10px] font-black text-rose-500 uppercase tracking-widest ml-1'>Description</label>
                                <textarea required name='description' placeholder='Describe the architectural beauty and features...' className='w-full h-40 px-5 py-4 bg-white border-2 border-rose-50 rounded-2xl focus:outline-none focus:border-rose-400 transition-all resize-none font-medium' />
                            </div>
                        </div>

                        {/* Capacity & Pricing Group */}
                        <div className='bg-white/80 backdrop-blur-xl rounded-[32px] p-8 shadow-sm border border-white/50'>
                            <h2 className='text-xl font-black text-[#261817] uppercase tracking-tight mb-6 flex items-center gap-2'>
                                <FaStar className='text-rose-500' />
                                Pricing & Capacity
                            </h2>
                            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                                <div className='space-y-1.5'>
                                    <label className='text-[9px] font-black text-[#59413F]/40 uppercase tracking-widest ml-1'>Price / Night</label>
                                    <div className='relative'>
                                        <FaDollarSign className='absolute left-4 top-1/2 -translate-y-1/2 text-rose-400 size-3' />
                                        <input required name='price' type='number' className='w-full pl-9 pr-4 py-3.5 bg-rose-50/30 border-2 border-transparent rounded-xl focus:bg-white focus:border-rose-400 transition-all font-bold text-rose-600' />
                                    </div>
                                </div>
                                <div className='space-y-1.5'>
                                    <label className='text-[9px] font-black text-[#59413F]/40 uppercase tracking-widest ml-1'>Guests</label>
                                    <div className='relative'>
                                        <FaUsers className='absolute left-4 top-1/2 -translate-y-1/2 text-rose-400 size-3' />
                                        <input required name='total_guest' type='number' className='w-full pl-9 pr-4 py-3.5 bg-rose-50/30 border-2 border-transparent rounded-xl focus:bg-white focus:border-rose-400 transition-all font-bold' />
                                    </div>
                                </div>
                                <div className='space-y-1.5'>
                                    <label className='text-[9px] font-black text-[#59413F]/40 uppercase tracking-widest ml-1'>Bedrooms</label>
                                    <div className='relative'>
                                        <FaBed className='absolute left-4 top-1/2 -translate-y-1/2 text-rose-400 size-3' />
                                        <input required name='bedrooms' type='number' className='w-full pl-9 pr-4 py-3.5 bg-rose-50/30 border-2 border-transparent rounded-xl focus:bg-white focus:border-rose-400 transition-all font-bold' />
                                    </div>
                                </div>
                                <div className='space-y-1.5'>
                                    <label className='text-[9px] font-black text-[#59413F]/40 uppercase tracking-widest ml-1'>Bathrooms</label>
                                    <div className='relative'>
                                        <FaBath className='absolute left-4 top-1/2 -translate-y-1/2 text-rose-400 size-3' />
                                        <input required name='bathrooms' type='number' className='w-full pl-9 pr-4 py-3.5 bg-rose-50/30 border-2 border-transparent rounded-xl focus:bg-white focus:border-rose-400 transition-all font-bold' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Media & Calendar */}
                    <div className='lg:col-span-5 space-y-6'>
                        <div className='bg-white/80 backdrop-blur-xl rounded-[32px] p-8 shadow-sm border border-white/50 space-y-6'>
                            <h2 className='text-xl font-black text-[#261817] uppercase tracking-tight flex items-center gap-2'>
                                <FiCamera className='text-rose-500' />
                                Media Gallery
                            </h2>
                            <div 
                                onClick={() => document.getElementById('image').click()}
                                className='aspect-[4/3] rounded-[24px] border-4 border-dashed border-rose-50 bg-rose-50/20 overflow-hidden cursor-pointer group relative flex items-center justify-center transition-all hover:bg-rose-50/40'
                            >
                                {previewImage ? (
                                    <img src={previewImage} alt='Preview' className='w-full h-full object-cover transition-transform group-hover:scale-105' />
                                ) : (
                                    <div className='flex flex-col items-center gap-2 text-rose-300'>
                                        <div className='p-4 bg-white rounded-2xl shadow-sm'>
                                            <FaUpload size={24} />
                                        </div>
                                        <span className='font-black uppercase text-[9px] tracking-widest'>Featured Image</span>
                                    </div>
                                )}
                                <input id='image' name='image' type='file' accept='image/*' className='hidden' onChange={handleImageChange} required />
                            </div>
                        </div>

                        <div className='bg-white/80 backdrop-blur-xl rounded-[32px] p-8 shadow-sm border border-white/50 space-y-6'>
                            <h2 className='text-xl font-black text-[#261817] uppercase tracking-tight flex items-center gap-2'>
                                <FaCalendarAlt className='text-rose-500' />
                                Availability
                            </h2>
                            <div className='bg-white rounded-2xl p-2 flex justify-center'>
                                <DateRange
                                    editableDateInputs={true}
                                    moveRangeOnFirstSelection={false}
                                    onChange={item => handleDates(item)}
                                    ranges={dates}
                                    rangeColors={['#fb7185']}
                                    className='w-full dashboard-calendar-simple'
                                />
                            </div>
                        </div>

                        <button
                            disabled={loading}
                            type='submit'
                            className='w-full bg-gradient-to-r from-rose-400 to-pink-500 text-white py-5 rounded-[24px] font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-rose-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 flex items-center justify-center gap-3'
                        >
                            {loading ? <TbFidgetSpinner className='animate-spin' /> : 'Publish Listing'}
                            {!loading && <FaCheckCircle />}
                        </button>
                    </div>
                </form>
            </div>
            
            <style>{`
                .dashboard-calendar-simple { border: none !important; font-family: inherit !important; }
                .dashboard-calendar-simple .rdrMonth { width: 100% !important; }
            `}</style>
        </div>
    )
}

export default AddRoomForm

