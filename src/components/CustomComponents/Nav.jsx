import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";

const Nav = () => {
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const [capsuleProps, setCapsuleProps] = useState({ width: 0, left: 0 });
  const navRef = useRef(null);
  const navRefs = useRef([]);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Versus", path: "/comparecoin" },
    { label: "Stack", path: "/watchlist" },
    { label: "Bot", path: "/chatbot" },
  ];

  // Function to update capsule position
  const updateCapsulePosition = (path = null) => {
    const targetPath = path || location.pathname;
    const activeIndex = navItems.findIndex((item) => item.path === targetPath);
    
    if (navRefs.current[activeIndex] && navRef.current) {
      const activeEl = navRefs.current[activeIndex];
      const navRect = navRef.current.getBoundingClientRect();
      const activeRect = activeEl.getBoundingClientRect();
      
      setCapsuleProps({
        width: activeRect.width,
        left: activeRect.left - navRect.left,
      });
    }
  };

  // Handle manual navigation to ensure proper capsule animation
  const handleSetActive = (path) => {
    // Immediately update capsule to the clicked position
    updateCapsulePosition(path);
  };

  // Handle scroll to hide/show nav
  useEffect(() => {
    const handleScroll = () => {
      setShowNav(window.scrollY <= lastScrollY);
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Update capsule position on route change and resize
  useEffect(() => {
    // Initial update
    updateCapsulePosition();
    
    // Set up resize event listener
    const handleResize = () => {
      updateCapsulePosition();
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [location.pathname]);

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: showNav ? 0 : -100 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed top-4 left-1/2 -translate-x-1/2 w-[90vw] sm:w-[80vw] md:w-[60vw] lg:w-[35vw] rounded-full z-[9999] bg-gray-400/10 backdrop-blur-lg shadow-lg px-2 sm:px-4"
      ref={navRef}
    >
      <div className="relative flex justify-around items-center py-1">
        {/* Capsule Background */}
        <motion.div
          className="absolute top-1 left-0 h-8 sm:h-10 bg-gradient-to-r from-[#7538e8] to-[#502ece] rounded-full z-0"
          animate={{
            width: capsuleProps.width,
            x: capsuleProps.left,
          }}
          transition={{ 
            type: "spring", 
            stiffness: 500, 
            damping: 30 
          }}
        />

        {navItems.map((item, index) => (
          <NavLink
            key={item.path}
            to={item.path}
            ref={(el) => (navRefs.current[index] = el)}
            onClick={() => handleSetActive(item.path)}
            className={({ isActive }) =>
              `relative z-10 px-3 sm:px-4 md:px-6 py-2 rounded-full font-medium transition-colors duration-300 text-sm sm:text-base ${
                isActive ? "text-white" : "text-gray-300 hover:text-white"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </motion.div>
  );
};

export default Nav;