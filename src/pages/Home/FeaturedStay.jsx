import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Phone, Eye } from 'lucide-react';

const IMAGES = {
  franke: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80"
};

const FeaturedStay = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Original Left Side Animations
  const leftX = useTransform(scrollYProgress, [0, 0.4], [-140, 0]);
  const leftScale = useTransform(scrollYProgress, [0, 0.4], [0.85, 1]);
  const leftOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  // Original Right Image Animations + Zoom
  const imageX = useTransform(scrollYProgress, [0, 0.4], [120, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [0.95, 1.15]); // They wanted it to zoom in on scroll
  const borderProgress = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        
        {/* Left content */}
        <motion.div
          style={{ x: leftX, scale: leftScale, opacity: leftOpacity }}
          className="relative z-10 flex items-center px-6 sm:px-10 lg:px-16 py-16 lg:py-0 bg-rose-50/30"
        >
          <div className="max-w-xl">
            <p className="text-rose-500 uppercase tracking-[0.35em] text-xs font-semibold mb-4">
              Featured Stay
            </p>

            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black uppercase leading-[0.9] mb-5 text-rose-500">
              THE FRANKE
            </h2>

            <p className="text-sm sm:text-base text-rose-500/80 max-w-md leading-relaxed mb-8 font-medium">
              House Of High Fashion. From The Runways Of Milan And Paris, This House Incorporates Various Designer Touches Of A Fashion Boutique.
            </p>

            <div className="mb-10">
              <span className="text-3xl md:text-4xl font-extrabold block text-rose-500">
                $2,900 <span className="text-xl font-bold">/ night</span>
              </span>
              <div className="w-16 h-1 bg-rose-500 mt-4 rounded-full"></div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-rose-400 to-pink-500 text-white px-8 py-4 rounded-xl flex items-center justify-center gap-2 text-sm font-bold hover:scale-105 transition shadow-lg shadow-rose-500/25">
                <Phone className="h-4 w-4" />
                <span>Call Now</span>
              </button>

              <button className="border-2 border-rose-500 text-rose-500 px-8 py-4 rounded-xl flex items-center justify-center gap-2 text-sm font-bold hover:bg-rose-500 hover:text-white transition">
                <Eye className="h-4 w-4" />
                <span>Book a Visit</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right image */}
        <div className="relative min-h-[60vh] lg:min-h-screen overflow-hidden">
          <motion.div
            className="sticky top-0 h-screen w-full overflow-hidden"
            style={{ x: imageX }}
          >
            <motion.img
              src={IMAGES.franke}
              alt="Franke Residence"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              style={{ scale: imageScale }}
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/10" />
          </motion.div>
        </div>
      </div>

      {/* Animated top border / chain line */}
      <div className="pointer-events-none absolute top-0 left-0 w-full h-24 overflow-hidden z-20">
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 1440 120"
          fill="none"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0 20H360C420 20 450 20 480 40C510 60 540 60 600 60H840C900 60 930 60 960 40C990 20 1020 20 1080 20H1440"
            stroke="#f43f5e"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="8 10"
            style={{
              pathLength: borderProgress,
              opacity: 0.8,
            }}
          />
          <motion.path
            d="M0 20H360C420 20 450 20 480 40C510 60 540 60 600 60H840C900 60 930 60 960 40C990 20 1020 20 1080 20H1440"
            stroke="#f43f5e"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="1 18"
            style={{
              pathLength: borderProgress,
              opacity: 0.18,
              filter: 'blur(1px)',
            }}
          />
        </svg>
      </div>
    </section>
  );
};

export default FeaturedStay;