"use client";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

const Model = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  // once: true => ek baar hi animate karega
  // margin: "-50px" => thoda jaldi trigger karega

  return (
    <div className="flex justify-center mx-auto mb-10">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 1.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <model-viewer
          src="/model/scene.gltf"
          autoplay
          camera-controls
          disable-zoom
          shadow-intensity="1"
          style={{ width: "250px", height: "250px" }}
          auto-rotate
        ></model-viewer>
      </motion.div>
    </div>
  );
};

export default Model;
