import React, { useState, useEffect } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

interface NavAnimationProps {
  children: React.ReactNode;
}

const NavAnimation: React.FC<NavAnimationProps> = ({ children }) => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();

    if (latest > previous!) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ type: "spring", damping: 15, stiffness: 100 }}
      className="fixed top-0 left-0 w-full z-50 bg-white shadow-lg"
    >
      {children}
    </motion.div>
  );
};

export default NavAnimation;
