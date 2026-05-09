import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const IMAGES = {
  elliott: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPgV52dRtdNHk2tKTb-L2biqfwRpFL9FFhQf4Nal7GHZxRJD7-4Vz6NYaTjCGyqRZeCEVwFJRm05qlrX5NJteQQ2P9MuPeIV2h2dJxwVdwGyHAdfrbdCJqummE9aItRMBceimx87gJ12MvVUEqhS9FOy8RE5V3YZjzvJF7AtsCP5MQEXxXpgJeWfINGzJxU8mFWFPSGXX3VS_HznY0YcrigEcNUpwd8DX7_CVbNkRvkDVU-L4YY820LMXhWJkqwdVhh64vYvFpRnM",
  ponderosa: "https://lh3.googleusercontent.com/aida-public/AB6AXuBs_9nQo1W-fOp1SxjpFtwbyvNG1wAXTSdijZjolWOYhsWOx2PBrqqRjYHikis8IFJkknjgigcDjTLJZdB9tm9hjIf40KjbFxkHIT1Ef3qc58VTOd8fzJjDCaySUCXaC3RoXkuo1WbIQX3Af4YKLJTG_YLtSi21zAhDeMDZ4VZBeM-6Q0K7eJg6yuil3Q54qvyZmIT_svlxgjh7PGkPVvo6SQKvxU6PYjWwQlMwaHmcKzqu8yyoduIFDVoq0noHI7neMJUjdZOVEmo",
  franke: "https://lh3.googleusercontent.com/aida-public/AB6AXuCngY1YQ7uv3Md2B3_LuZe48acC1vi0jwJRVLCI-5xGC-1AKHaVueanHhbe25iKHbVRNwlsc2nRNR7TOrYqbM6Dl0dEziSaBTJsBWprAmbrr5qgw0VLIUYmfMU6bcngEiCRtUV6MCWEfzKgxas5Ydd2SGi59LG28ICvXhU-2xuRTGPRw8M5C1-9CkGdGQf5PL_CYcdgdBvACrDfkXhRCeBvyXKEwIMdy0Q6cTMgUsAutAOAqxaCC3-ORDL-N-9xvCzytmi1g9okIWw"
};

const SignatureRentals = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });



  const card1Y = useTransform(scrollYProgress, [0, 0.4], [80, 0]);
  const card2Y = useTransform(scrollYProgress, [0, 0.4], [120, 0]);
  const card3Y = useTransform(scrollYProgress, [0, 0.4], [160, 0]);

  const card1Scale = useTransform(scrollYProgress, [0, 0.4], [0.95, 1]);
  const card2Scale = useTransform(scrollYProgress, [0, 0.4], [0.9, 1.05]);
  const card3Scale = useTransform(scrollYProgress, [0, 0.4], [0.95, 1]);

  const rentals = [
    { name: "Villa Bella", price: "5,300", image: IMAGES.elliott, desc: "Signature Architectural Series" },
    { name: "Ocean Breeze", price: "3,200", image: IMAGES.ponderosa, desc: "Lakeside Architectural Gem" },
    { name: "Sunset Ridge", price: "2,900", image: IMAGES.franke, desc: "Continues into Featured Stay" },
  ];

  return (
    <section
      className="py-24 px-6 md:px-12 bg-white relative overflow-hidden"
      id="listings-section"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 overflow-hidden">
          <motion.h2 
            className="text-3xl md:text-5xl font-extrabold uppercase mb-4 text-rose-500 flex justify-center flex-wrap"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.04 }
              }
            }}
          >
            {"Explore Our Signature Rentals".split("").map((char, index) => (
              <motion.span
                key={index}
                variants={{
                  hidden: { y: 50, opacity: 0 },
                  visible: { 
                    y: 0, 
                    opacity: 1, 
                    transition: { type: "spring", damping: 12, stiffness: 200 } 
                  }
                }}
                style={{ display: "inline-block", whiteSpace: "pre" }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h2>
          <motion.p 
            className="text-rose-500/80 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            Search over 2,000 luxury architectural stays worldwide
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rentals.map((rental, index) => {
            const isSecond = index === 1;
            const isLast = index === 2;

            const cardY =
              index === 0 ? card1Y :
              index === 1 ? card2Y :
              card3Y;

            const cardScale =
              index === 0 ? card1Scale :
              index === 1 ? card2Scale :
              card3Scale;

            return (
              <motion.div
                key={rental.name}
                style={{ y: cardY, scale: cardScale }}
                className={`relative group cursor-pointer overflow-hidden rounded-[28px] aspect-[3/4] shadow-lg ${
                  isSecond ? 'md:scale-[1.05] z-10 shadow-2xl' : ''
                } ${isLast ? 'md:translate-y-10' : ''}`}
              >
                <motion.img
                  src={rental.image}
                  alt={rental.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  style={
                    isLast
                      ? { transformOrigin: 'center bottom' }
                      : {}
                  }
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="text-2xl font-black uppercase text-white mb-1">
                    {rental.name.split(' ')[0]}
                  </h3>

                  <p className="text-[#FFDAD8] text-sm mb-2">
                    {rental.desc}
                  </p>

                  <p className="text-xl font-bold text-white">
                    ${rental.price} / night
                  </p>
                </div>

                <div className="absolute top-5 right-5">
                  {isSecond ? (
                    <div className="w-12 h-12 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-rose-500/40">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center group-hover:bg-rose-500 group-hover:text-white transition text-white">
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  )}
                </div>

                {isLast && (
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FCE2E1]/20 pointer-events-none" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SignatureRentals;