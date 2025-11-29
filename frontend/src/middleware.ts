import { i18nRouter } from 'next-i18n-router'
import { type NextRequest, NextResponse } from 'next/server'

import i18nConfig from '../i18nConfig'

export default function middleware(request: NextRequest) {
	const { nextUrl, cookies, url } = request
	const originalPath = nextUrl.pathname


	const session = cookies.get('genealogy.session.name')?.value
	const locale = cookies.get('NEXT_LOCALE')?.value || 'ru'
	const profilePage = originalPath.includes('/dashboard')


	if (profilePage && !session) {
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
