// "use client";

// import React, { useRef, useEffect } from "react";
// import { motion, useMotionValue, useTransform } from "framer-motion";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Model from "../Model";

// gsap.registerPlugin(ScrollTrigger);

// const CoinSection = () => {
//   const sectionRef = useRef(null);
//   const coinRef = useRef(null);

//   // Framer Motion motion values
//   const scrollProgress = useMotionValue(0);
//   const x = useTransform(scrollProgress, [0, 0.8], ["-40vw", "80vw"]);
//   const rotateY = useTransform(scrollProgress, [0, 0.8], [0, 2160]); // 6 spins
//   const y = useTransform(scrollProgress, [0.8, 1], [0, 250]);
//   const rotateX = useTransform(scrollProgress, [0.8, 1], [0, 360]);

//   useEffect(() => {
//     let ctx = gsap.context(() => {
//       ScrollTrigger.create({
//         trigger: sectionRef.current,
//         start: "top top",
//         end: "bottom bottom",
//         pin: true,
//         scrub: true,
//         onUpdate: (self) => {
//           scrollProgress.set(self.progress); // GSAP updates Framer Motion
//         },
//       });
//     }, sectionRef);

//     return () => ctx.revert();
//   }, [scrollProgress]);

//   return (
//     <div ref={sectionRef} className="relative h-[300vh] bg-black">
//       <div className="h-screen flex justify-center items-center">
//         <motion.div
//           ref={coinRef}
//           style={{ x, y, rotateY, rotateX }}
//           className="w-64 h-64"
//         >
//           <Model />
//         </motion.div>
//       </div>

//       <div className="absolute top-[220vh] w-full text-center text-white">
//         <h2 className="text-3xl">Next Section Content...</h2>
//       </div>
//     </div>
//   );
// };

// export default CoinSection;

"use client";

import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Model from "../Model";

gsap.registerPlugin(ScrollTrigger);

const CoinSection = () => {
  const sectionRef = useRef(null);

  const scrollProgress = useMotionValue(0);
  const x = useTransform(scrollProgress, [0, 1], ["-40vw", "40vw"]);
  const rotatez = useTransform(scrollProgress, [0, 0.8], [0, 8 * 360]); // Coin spin (8 full rotations)
  const y = useTransform(scrollProgress, [0.8, 1], [0, 240]);
  const rotateZ2 = useTransform(scrollProgress, [0.8, 1], [0, 360]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          scrollProgress.set(self.progress);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [scrollProgress]);

  return (
    <div ref={sectionRef} className="relative h-[300vh] bg-black">
      <div className="h-screen flex justify-center items-center">
        <motion.div
          style={{ x, rotatez, y, rotateZ2 }}
          className="w-64 h-64"
        >
          <Model />
        </motion.div>
      </div>

      <div className="absolute top-[90vh] w-full text-center text-white">
        <h2 className="text-3xl">Next Section Content...</h2>
      </div>
    </div>
  );
};

export default CoinSection;

