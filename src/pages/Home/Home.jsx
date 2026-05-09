import { Helmet } from 'react-helmet-async'
import Categories from '../../components/Categories/Categories'
import Rooms from '../../components/Home/Rooms'
import HeroSection from './HeroSection'
import SignatureRentals from './SignatureRentals'
import FeaturedStay from './FeaturedStay'
import DreamHouseBanner from './DreamHouseBanner'

const Home = () => {
  return (
    <div className="w-full overflow-x-hidden font-sans selection:bg-black selection:text-white">
      <Helmet>
        <title>Acommo | Vacation Homes & Condo Rentals</title>
      </Helmet>
      
      <HeroSection />
      <SignatureRentals />
      <FeaturedStay />

      <div className="bg-rose-50/10 py-8 relative z-20 border-t border-rose-500/10">
        {/* Categories section  */}
        <div className="sticky top-[68px] z-40 bg-white/80 backdrop-blur-md pb-4 mb-8 px-4 border-b border-rose-500/10">
          <Categories />
        </div>
        
        {/* Rooms section */}
        <div className="px-4">
          <Rooms />
        </div>
      </div>

      <DreamHouseBanner />
    </div>
  )
}

export default Home
