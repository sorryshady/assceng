"use client";
import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "../ui/image-slider";
import Link from "next/link";

const Slider = () => {
  const images = [
    "/imageslider_1.jpg", // Replace with your image filenames
    "/imageslider_2.jpg",
    "/imageslider_3.jpg",
  ];
  return (
    <ImagesSlider className="h-[50rem] " images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -70,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.1,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >
        <motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          Welcome to Association of Engineers Kerala
        </motion.p>

        <button className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
          <Link href="/contact">Contact Us →</Link>
          <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
        </button>
      </motion.div>
    </ImagesSlider>
  );
};

export default Slider;
