"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * TextGenerateEffect is a component that generates a typewriter-like effect
 * by animating the opacity and filter (blur) properties of each word in the
 * given string. The effect is triggered when the component comes into view.
 *
 * @param {String} words The string to be animated. Each word will be
 *   animated separately.
 * @param {String} [className] Optional CSS class to be applied to the
 *   component.
 * @param {Boolean} [filter=true] If true, apply a blur filter to the words
 *   before animating. If false, do not apply any filter.
 * @param {Number} [duration=0.5] The duration of the animation, in seconds.
 * @param {Boolean} [once=true] If true, only animate once when the component
 *   comes into view. If false, animate each time the component comes into
 *   view.
 * @returns {React.ReactElement} The animated component.
 */
export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
  once = true // scroll hone par sirf ek baar chale ya har baar
}) => {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { margin: "-10% 0px", once }); 
  // margin se thoda pehle trigger ho jayega

  let wordsArray = words.split(" ");

  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        {
          opacity: 1,
          filter: filter ? "blur(0px)" : "none",
        },
        {
          duration: duration ? duration : 1,
          delay: stagger(0.1),
        }
      );
    }
  }, [isInView]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => (
          <motion.span
            key={word + idx}
            className="text-white opacity-0"
            style={{
              filter: filter ? "blur(10px)" : "none",
            }}
          >
            {word}{" "}
          </motion.span>
        ))}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="">
        <div className="text-white md:text-2xl text-[22px] px-5 mb-5 md:mb-0  leading-snug tracking-wide">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
