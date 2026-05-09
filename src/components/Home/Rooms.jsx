import { useState, useEffect } from 'react'
import Card from './Card'
import Container from '../Shared/Container'
import Heading from '../Shared/Heading'
import LoadingSpinner from '../Shared/LoadingSpinner'
import { useQuery } from '@tanstack/react-query'

import useAxiosCommon from '../../hooks/useAxiosCommon'
import { useSearchParams } from 'react-router-dom'

const Rooms = () => {
  const axiosCommon = useAxiosCommon();
  // eslint-disable-next-line no-unused-vars
  const [params, setParam] = useSearchParams();
  const category = params.get('category')

  const [visibleCount, setVisibleCount] = useState(6);

  // Reset pagination when category changes
  useEffect(() => {
    setVisibleCount(6);
  }, [category]);

  const {data:rooms=[], isLoading} = useQuery({
    queryKey:['rooms', category],
    queryFn : async()=>{
      const url = category && category !== 'All' ? `/rooms?category=${category}` : '/rooms';
      const res = await axiosCommon.get(url)
      return res.data;
    }
  })
  
  if (isLoading) return <LoadingSpinner />

  const handleExplore = () => {
    setVisibleCount(prev => prev + 6);
  };

  const handleShowLess = () => {
    setVisibleCount(6);
    // Optional: scroll back up slightly if you want, but resetting is usually enough
  };

  const visibleRooms = rooms.slice(0, visibleCount);

  return (
    <Container>
      {rooms && rooms.length > 0 ? (
        <>
          <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
            {visibleRooms.map(room => (
              <Card key={room._id} room={room} />
            ))}
          </div>

          <div className="flex flex-col items-center mt-12 mb-4">
            {(visibleCount < rooms.length || visibleCount > 6) && (
               <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#7A3B40] mb-4">
                 MORE RENTAL OPTIONS BELOW
               </span>
            )}
            <div className="flex items-center gap-4">
              {visibleCount < rooms.length && (
                <button 
                  onClick={handleExplore}
                  className="bg-gradient-to-r from-rose-400 to-pink-500 text-white px-8 py-3 rounded-xl font-bold uppercase text-xs tracking-wider hover:scale-105 transition-all shadow-lg shadow-rose-500/25 flex items-center gap-2"
                >
                  Explore Rentals <span className="text-sm font-light leading-none">&#711;</span>
                </button>
              )}
              {visibleCount > 6 && (
                <button 
                  onClick={handleShowLess}
                  className="border-2 border-rose-500 text-rose-500 px-8 py-3 rounded-xl font-bold uppercase text-xs tracking-wider hover:bg-[#FFF0EF] transition-all flex items-center gap-2"
                >
                  Show Less <span className="text-sm font-light leading-none rotate-180">&#711;</span>
                </button>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className='flex items-center justify-center min-h-[calc(100vh-300px)]'>
          <Heading
            center={true}
            title='No Rooms Available In This Category!'
            subtitle='Please Select Other Categories.'
          />
        </div>
      )}
    </Container>
  )
}

export default Rooms
