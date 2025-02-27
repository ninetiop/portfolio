import React, { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";


const sectionIds: string[] = ["whoami", "skills", "experiences", "contact"];

const ArrowScroll: React.FC = () => {
  const [direction, setDirection] = useState<"up" | "down">("down");
  const [navbarHeight, setNavbarHeight] = useState<number>(100);

  useEffect(() => {

    const navbar = document.getElementById("navbar");
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight); 
    }

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setDirection(currentScrollY > lastScrollY ? "down" : "up");
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

 
  const currentSection = sectionIds.find((id) => {
    const section = document.getElementById(id);
    return section && section.getBoundingClientRect().top >= -100;
  });


  const currentIndex = sectionIds.indexOf(currentSection || "whoami");
  const prevSection = sectionIds[currentIndex - 1] || null;
  const nextSection = sectionIds[currentIndex + 1] || null;

  return (
    <>

      {direction === "down" && nextSection && (
        <Link to={nextSection} smooth={true} duration={800} offset={-navbarHeight}>
          <motion.div
            className="fixed left-1/2 transform -translate-x-1/2 cursor-pointer z-50"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ bottom: "20px" }} 
          >
            <ArrowDownward className="text-white text-4xl hover:text-gray-400 transition duration-300" />
          </motion.div>
        </Link>
      )}


      {direction === "up" && prevSection && (
        <Link to={prevSection} smooth={true} duration={800} offset={-navbarHeight}>
          <motion.div
            className="my-20 fixed left-1/2 transform -translate-x-1/2 cursor-pointer z-50"
            animate={{ y: [-10, 0, -10] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ top: "70px" }} 
          >
            <ArrowUpward className="text-white text-4xl hover:text-gray-400 transition duration-300" />
          </motion.div>
        </Link>
      )}
    </>
  );
};

export default ArrowScroll;
