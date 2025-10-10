
import React from 'react'
import Link from 'next/link'

import { TFunction } from 'i18next'

interface IPromoBanner {
  t: TFunction
}

export const PromoBanner: React.FC<IPromoBanner> = ({t}) => {

  return (
    <section className="relative w-full overflow-hidden text-white shadow-lg mx-auto mt-10 max-w-7xl bg-gradient-to-r from-[#6a82fa] to-[#8abffb] p-4 rounded-xl">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-8 text-center md:flex-row md:gap-12 md:text-left">
        
        {/* Текст */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold md:text-4xl">Split. {t('homepage.title')}</h2>
          <p className="mt-4 text-lg opacity-90">{t('homepage.subtitle')}</p>

          <div className="mt-6 flex justify-center md:justify-start">
            <Link
              href="https://split.tg/?ref=UQCJX2F1H8RcEEMacxzgxZezVIidQTQrqEtcISSVB4p7rYR1" // 🔗 тут вставь ссылку на своё приложение
              className="rounded-full bg-white px-8 py-3 text-blue-600 font-medium shadow hover:bg-gray-100 transition"
              target='_blank'
            >
              {t('homepage.learnMore')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
