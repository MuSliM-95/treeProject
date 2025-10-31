import { i18nRouter } from 'next-i18n-router'
import { type NextRequest, NextResponse } from 'next/server'

import i18nConfig from '../i18nConfig'

export default function middleware(request: NextRequest) {
	const { nextUrl, cookies, url } = request
	const originalPath = nextUrl.pathname


	const session = cookies.get('session')?.value
	const locale = cookies.get('NEXT_LOCALE')?.value || 'ru'
	const isAuthPage = originalPath.includes(`/${locale}/auth`)
	const profilePage = originalPath.includes('/dashboard')

	// if (isAuthPage) {
	// 	if (session) {
	// 		return NextResponse.redirect(
	// 			new URL(`/${locale}/dashboard/profile`, url)
	// 		)
	// 	}
	// 	return NextResponse.next()
	// }

	if (profilePage && !session) {
		console.log('locale', locale)
		return NextResponse.redirect(new URL(`/${locale}/auth/login`, url))
	}

	return i18nRouter(request, i18nConfig)
}

export const config = {
	matcher: [
		'/((?!api|static|.*\\..*|_next).*)',
		'/auth/:path*',
		'/tree/:path*',
		'/'
	]
}
