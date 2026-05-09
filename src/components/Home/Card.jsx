import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { differenceInDays, format } from 'date-fns'

const Card = ({ room }) => {
  let nightsCount = 5;
  let dateRange = '';

  if (room?.availability?.startDate && room?.availability?.endDate) {
    const start = new Date(room.availability.startDate);
    const end = new Date(room.availability.endDate);
    
    // Calculate nights
    const diff = differenceInDays(end, start);
    nightsCount = diff > 0 ? diff : 1; // Default to 1 if same day
    
    // Format dates
    dateRange = `${format(start, 'MMM dd')} - ${format(end, 'MMM dd')}`;
  }

  return (
    <Link to={`/room/${room?._id}`} className='col-span-1 cursor-pointer group'>
      <div className='flex flex-col gap-2 w-full'>
        <div
          className='
              aspect-square 
              w-full 
              relative 
              overflow-hidden 
              rounded-xl
            '
        >
          <img
            className='
                object-cover 
                h-full 
                w-full 
                group-hover:scale-110 
                transition
              '
            src={room?.image_url}
            alt='Room'
          />
          <div
            className='
              absolute
              top-3
              right-3
            '
          ></div>
        </div>
        <div className='font-semibold text-xs text-black'>{room?.location}</div>
        <div className='font-light text-[10px] text-haven-tertiary'>
          {nightsCount} night{nightsCount > 1 ? 's' : ''} {dateRange ? `· ${dateRange}` : ''}
        </div>
        <div className='flex flex-row items-center gap-1 text-xs'>
          <div className='font-bold text-[#E84750]'>${room?.price}</div>
          <div className='font-light text-haven-tertiary'>/ night</div>
        </div>
      </div>
    </Link>
  )
}

Card.propTypes = {
  room: PropTypes.object,
}

export default Card
