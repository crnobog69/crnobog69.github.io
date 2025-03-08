"use client";

import { useState, useEffect } from "react";
import { Libre_Baskerville } from "next/font/google";

const libreBaskerville = Libre_Baskerville({
  weight: ["700"],
  subsets: ["latin"],
  display: "swap",
});

export default function VrtloznicaPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="overflow-hidden h-screen w-screen">
      <style jsx global>{`
        /* Hide scrollbars for all browsers */
        html, body {
          overflow: hidden;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE and Edge */
        }
        
        /* Webkit browsers (Chrome, Safari) */
        html::-webkit-scrollbar, 
        body::-webkit-scrollbar {
          display: none;
        }

        @keyframes flashColors {
          0% {
            background-color: #ff0000;
          }
          10% {
            background-color: #ff7700;
          }
          20% {
            background-color: #ffff00;
          }
          30% {
            background-color: #77ff00;
          }
          40% {
            background-color: #00ff00;
          }
          50% {
            background-color: #00ff77;
          }
          60% {
            background-color: #0000ff;
          }
          70% {
            background-color: #7700ff;
          }
          80% {
            background-color: #ff00ff;
          }
          90% {
            background-color: #ff0077;
          }
          100% {
            background-color: #ff0000;
          }
        }

        .flashing-bg {
          animation: flashColors 0.2s infinite linear;
        }

        /* Responsive text sizing */
        .responsive-text {
          font-size: clamp(2rem, 15vw, 9rem);
          line-height: 1.1;
        }

        /* Ensure text remains visible on all devices */
        @media (max-height: 400px) {
          .responsive-text {
            font-size: clamp(1.5rem, 10vh, 4rem);
          }
        }
      `}</style>

      <div className="flashing-bg h-full w-full flex items-center justify-center">
        <div
          className={`responsive-text font-black text-white text-center px-4 max-w-full break-words ${libreBaskerville.className}`}
        >
          ВРТЛОЖНИЦА
          <br />
          ЈЕ ПУНА
        </div>
      </div>
    </div>
  );
}
