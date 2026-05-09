import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

const IMAGES = {
  interior: "https://lh3.googleusercontent.com/aida-public/AB6AXuDniqZYPb8D4XIh9RKfc2_BWKZtYOP2Uuvr6SKR6gT76isrIeqFLqGUJ-qT-dY5fQTV2FhzB1v4GVZSmGV1R7KGiXb8xwQiVimrQ6QAUSLKKVN_gojzVaU4GFrx52QiIqLmU4DSqwm6J6KotOyzqmb4r5qDwCZfZP_2Imwl2w_OaBPFAlb54sQqG6F5Ru8NNgh2Runie5Xc_E_u5uMPMxLMlSMQNI1P03L9bTSO9TRE6tqK5BZUk8ZV48KRU0dAWf_4hpIUpFbY6Z8"
};

const DreamHouseBanner = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const circleY = useTransform(scrollYProgress, [0, 0.5], [100, -100]);
  const circleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.4], [0, 1, 0]);

  return (
    <section ref={containerRef} className="relative py-32 px-6 bg-white overflow-hidden min-h-[800px]">
      {/* The Rose Bubble that shrinks */}
      <motion.div 
        initial={{ height: "100%", borderBottomLeftRadius: "0%", borderBottomRightRadius: "0%" }}
        whileInView={{ height: "100px", borderBottomLeftRadius: "100%", borderBottomRightRadius: "100%" }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 w-full bg-[#FFF0EF] z-0"
      />

      <motion.div 
        initial={{ opacity: 0, y: 150 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10"
      >
        <div className="relative">
          <motion.h2 className="text-6xl md:text-8xl font-black uppercase leading-[0.85] tracking-tighter mb-8">
            <span className="text-[#261817]">Your Dream</span> <br /> 
            <span className="text-rose-500">House</span>
          </motion.h2>
          <p className="text-[#59413F] text-sm mb-10 max-w-md leading-relaxed">
            Ferrari Design Company, Italian Closets By Molteni&amp;Dada With Designer Touches By Skilled Artisans. All Bathroom Cabinets And Bedrooms Are By Snaidero.
          </p>
          <button className="bg-gradient-to-r from-rose-400 to-pink-500 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-3 hover:scale-105 transition-all text-sm w-fit shadow-lg shadow-rose-500/25">
            <MessageSquare className="w-4 h-4" />
            Get In Touch
          </button>

          <motion.div 
            style={{ y: circleY, opacity: circleOpacity }}
            className="absolute -left-20 top-0 w-64 h-64 border border-rose-500/10 rounded-full flex items-center justify-center p-8 pointer-events-none"
          >
            <div className="w-full h-full border border-rose-500/5 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-rose-500 rounded-full" />
            </div>
          </motion.div>
        </div>

        <motion.div style={{ y }} className="relative group">
          <div className="rounded-xl overflow-hidden shadow-2xl h-[600px]">
            <img src={IMAGES.interior} alt="Dream Interior" className="w-full h-full object-cover" />
          </div>
          
          <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-rose-400 to-pink-500 w-24 h-24 rounded-full flex items-center justify-center text-white z-10 shadow-xl shadow-rose-500/25 border-4 border-white">
            <span className="text-xs font-bold uppercase text-center leading-tight">Since<br/>1998</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default DreamHouseBanner;
