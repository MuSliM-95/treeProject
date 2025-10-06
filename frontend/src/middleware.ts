// middleware.ts
import { type NextRequest, NextResponse } from 'next/server'
import { i18nRouter } from 'next-i18n-router'
import i18nConfig from '../i18nConfig'

const SUPPORTED_LOCALES = i18nConfig.locales ?? ['en', 'ru']
const DEFAULT_LOCALE = i18nConfig.defaultLocale ?? 'en'

export default function middleware(request: NextRequest) {
  const { nextUrl } = request
  const originalPath = nextUrl.pathname // e.g. '/ru/auth/login' or '/auth/login'
  const segments = originalPath.split('/').filter(Boolean) // ['ru','auth','login'] or ['auth','login']

  // Определим, есть ли префикс локали и "чистый" путь после локали
  const maybeLocale = segments[0]
  const hasLocalePrefix = SUPPORTED_LOCALES.includes(maybeLocale)
  const locale = hasLocalePrefix ? maybeLocale : ''
  // pathAfterLocale: путь, который мы будем проверять на совпадения
  const pathAfterLocale = hasLocalePrefix ? '/' + segments.slice(1).join('/') : originalPath
  // Нормализуем: '/' вместо '' если нет сегментов после локали
  const normalizedPath = pathAfterLocale === '' ? '/' : pathAfterLocale

  // --- Временно отключаем /tree/feedback ---
  if (normalizedPath.startsWith('/tree/feedback')) {
    // Редиректим на /<locale>/tree или /tree
    const target = locale ? `/${locale}/tree` : '/tree'
    const redirectUrl = new URL(`${target}${nextUrl.search}`, request.url)
    return NextResponse.redirect(redirectUrl)
  }

  // --- Временно отключаем все /auth/* ---
  if (normalizedPath === '/auth' || normalizedPath.startsWith('/auth/')) {
    // Редиректим на корень с локалью, если префикс есть
    const target = locale ? `/${locale}` : '/'
    const redirectUrl = new URL(`${target}${nextUrl.search}`, request.url)
    return NextResponse.redirect(redirectUrl)
  }


  // Передаём i18n router (остальное обрабатывается им)
  return i18nRouter(request, i18nConfig)
}

export const config = {
  // применяем к всем обычным путям (исключаем api, _next, статику и т.д.)
  matcher: ['/((?!api|static|.*\\..*|_next).*)', '/auth/:path*', '/tree/:path*', '/']
}
