import { motion, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function Card({ i, title, description, src, url, color, progress, range, targetScale }) {
  const container = useRef(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * 40}px)`
        }}
        className="relative flex flex-col w-[40vw] h-[50vh] rounded-3xl p-12 origin-top"
      >
        <div className="absolute top-10 left-10 w-20">
          <Image src={url} alt={title} width={40} height={40} />
        </div>
        <div className="absolute left-10 bottom-20 flex flex-col gap-4">
            <h2 className="text-xl tracking-tight bottom-10 text-black font-bold">{title}</h2>
            <p className="text-lg tracking-tight bottom-10 text-black/70 w-[60%]">{description}</p>
        </div>
      </motion.div>
    </div>
  );
};