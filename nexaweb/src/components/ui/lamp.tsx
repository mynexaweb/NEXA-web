"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const check = () => setNarrow(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const bw0 = narrow ? "7rem"  : "15rem";
  const bw1 = narrow ? "13rem" : "30rem";
  const dur  = narrow ? 0.5    : 0.8;

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden bg-[#070b18] w-full z-0 min-h-screen",
        className
      )}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
        {/* Left beam */}
        <motion.div
          key={`lb-${narrow}`}
          initial={{ opacity: 0.5, width: bw0 }}
          animate={{ opacity: 1, width: bw1 }}
          transition={{ delay: 0.2, duration: dur, ease: "easeInOut" }}
          style={{ backgroundImage: "conic-gradient(from 70deg at center top, #1447e6, transparent, transparent)" }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible text-white"
        >
          <div className="absolute w-full left-0 bg-[#070b18] h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-40 h-full left-0 bg-[#070b18] bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        {/* Right beam */}
        <motion.div
          key={`rb-${narrow}`}
          initial={{ opacity: 0.5, width: bw0 }}
          animate={{ opacity: 1, width: bw1 }}
          transition={{ delay: 0.2, duration: dur, ease: "easeInOut" }}
          style={{ backgroundImage: "conic-gradient(from 290deg at center top, transparent, transparent, #1447e6)" }}
          className="absolute inset-auto left-1/2 h-56 text-white"
        >
          <div className="absolute w-40 h-full right-0 bg-[#070b18] bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-full right-0 bg-[#070b18] h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>

        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-[#070b18] blur-2xl" />
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />

        {/* Outer glow — smaller on mobile */}
        <div className={cn(
          "absolute inset-auto z-50 -translate-y-1/2 rounded-full bg-[#1447e6] opacity-50 blur-3xl",
          narrow ? "h-24 w-[12rem]" : "h-36 w-[28rem]"
        )} />

        {/* Inner glow — animated */}
        <motion.div
          key={`ig-${narrow}`}
          initial={{ width: narrow ? "3rem" : "8rem" }}
          animate={{ width: narrow ? "7rem" : "16rem" }}
          transition={{ delay: 0.2, duration: dur, ease: "easeInOut" }}
          className={cn(
            "absolute inset-auto z-30 -translate-y-24 rounded-full bg-[#3b6fff] blur-2xl",
            narrow ? "h-24" : "h-36"
          )}
        />

        {/* Horizontal line — animated */}
        <motion.div
          key={`hl-${narrow}`}
          initial={{ width: bw0 }}
          animate={{ width: bw1 }}
          transition={{ delay: 0.2, duration: dur, ease: "easeInOut" }}
          className="absolute inset-auto z-50 h-0.5 -translate-y-28 bg-[#3b6fff]"
        />

        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-[#070b18]" />
      </div>

      <div className={cn(
        "relative z-50 flex flex-col items-center px-5",
        narrow ? "-translate-y-60" : "-translate-y-80"
      )}>
        {children}
      </div>
    </div>
  );
};
