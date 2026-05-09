import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, Star, MapPin, Award, Play } from 'lucide-react';
import { useRef } from 'react';

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2800&q=100"
};

const HeroSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const statsY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const bottomFrameY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const scrollIndicatorY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const stats = [
    { icon: Star, label: "Luxury Collection", value: "50+ Properties" },
    { icon: MapPin, label: "Prime Locations", value: "12 Destinations" },
    { icon: Award, label: "5-Star Rating", value: "2,000+ Reviews" }
  ];

  return (
    <section ref={sectionRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY }}>
        <img 
          alt="Luxury villa" 
          className="w-full h-[120%] object-cover" 
          src={IMAGES.hero}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>
      </motion.div>

      {/* Content */}
      <motion.div 
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        style={{ y: titleY, opacity: contentOpacity }}
      >


        {/* Main Heading - Split Animation */}
        <motion.h1 
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold uppercase tracking-tight mb-6 leading-none"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { staggerChildren: 0.2, delayChildren: 0.4 }
            }
          }}
        >
          <motion.span 
            className="block text-white leading-tight"
            variants={{
              hidden: { x: '-100vw', opacity: 0 },
              visible: { x: 0, opacity: 1, transition: { duration: 1 } }
            }}
          >
            Book Your
          </motion.span>
          <motion.span 
            className="block bg-gradient-to-r from-[#FFDAD8] via-rose-500 to-[#FFDAD8] text-transparent bg-clip-text"
            style={{ backgroundSize: '200% auto', animation: 'shimmer 3s linear infinite' }}
            variants={{
              hidden: { x: '100vw', opacity: 0 },
              visible: { x: 0, opacity: 1, transition: { duration: 1 } }
            }}
          >
            Architectural Escape
          </motion.span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-lg md:text-xl text-[#FFDAD8]/80 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
        >
          Discover handpicked luxury villas where modern architecture meets breathtaking nature.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto sm:max-w-none"
        >
          <button 
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            className="group flex items-center gap-3 bg-gradient-to-r from-rose-400 to-pink-500 px-8 py-4 rounded-xl hover:opacity-90 transition-all duration-300 text-white shadow-2xl shadow-rose-500/30 font-semibold hover:scale-105 whitespace-nowrap"
          >
            <span className="uppercase tracking-wider font-bold text-sm">Explore Properties</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="group flex items-center gap-3 bg-white/10 backdrop-blur-md px-8 py-4 rounded-xl hover:bg-rose-500/20 transition-all duration-300 text-[#FFDAD8] border border-[#FFDAD8]/30 font-semibold hover:scale-105 whitespace-nowrap">
            <Play className="w-5 h-5 fill-current" />
            <span className="uppercase tracking-wider font-medium text-sm">Virtual Tour</span>
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          style={{ y: statsY }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
        >
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-[#FFDAD8]/10 hover:border-rose-500/30 transition-all duration-300 text-center">
              <stat.icon className="w-6 h-6 text-rose-500 mx-auto mb-3" />
              <div className="text-[#FFDAD8] font-bold text-xl">{stat.value}</div>
              <div className="text-[#FFDAD8]/60 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30"
        style={{ y: scrollIndicatorY }}
      >
        <div className="w-px h-12 bg-gradient-to-b from-[#FFDAD8] to-transparent"></div>
        <motion.span 
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-xs uppercase tracking-[0.3em] text-[#FFDAD8]/70 font-medium"
        >
          Scroll to Explore
        </motion.span>
      </motion.div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;