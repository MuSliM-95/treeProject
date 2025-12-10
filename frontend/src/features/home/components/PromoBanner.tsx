"use client";

import Script from "next/script";
import React from "react";

export const PromoBanner: React.FC = () => {
  return (
    <section className="relative mx-auto mt-10 w-full max-w-7xl overflow-hidden rounded-xl bg-gradient-to-r from-[#6a82fa] to-[#8abffb] p-4 text-white shadow-lg">

      {/* Контейнер — сюда вставится iframe */}
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

      {/* Скрипт баннера */}
      <Script
        id="ad-script"
        src="//www.highperformanceformat.com/79db065236639e644fcb02bd3558a8f0/invoke.js"
        strategy="afterInteractive"
        onLoad={() => {
          // Перемещаем автоматически вставленный iframe ВОВНУТЬ контейнера
          const iframe = document.querySelector("iframe[src*='highperformanceformat']");
          const container = document.getElementById("ad-container");

          if (iframe && container && !container.contains(iframe)) {
            container.appendChild(iframe);
          }
        }}
      />
    </section>
  );
};
