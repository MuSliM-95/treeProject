"use client";

import Script from "next/script";
import React from "react";


export const PromoBanner: React.FC = () => {
  return (
    <section className="relative mx-auto mt-10 w-full max-w-7xl overflow-hidden rounded-xl bg-gradient-to-r from-[#6a82fa] to-[#8abffb] p-4 text-white shadow-lg">

      {/* Контейнер — САМЫЙ ВАЖНЫЙ ЭЛЕМЕНТ */}
      <div id="ad-container" className="flex justify-center"></div>

      {/* Настройки рекламы */}
      <Script id="ads-options" strategy="afterInteractive">
        {`
          window.atOptions = {
            'key' : '79db065236639e644fcb02bd3558a8f0',
            'format' : 'iframe',
            'height' : 90,
            'width' : 728,
            'params' : {}
          };
        `}
      </Script>

      {/* Основной рекламный JS */}
      <Script
        src="//www.highperformanceformat.com/79db065236639e644fcb02bd3558a8f0/invoke.js"
        strategy="afterInteractive"
      />
    </section>
  );
};
