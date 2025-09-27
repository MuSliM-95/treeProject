import { type NextRequest, NextResponse } from 'next/server'

export default function middleware(request: NextRequest) {
	const { url, cookies, nextUrl } = request

	const pathname = nextUrl.pathname.startsWith('/auth');
	const feedback = nextUrl.pathname.startsWith('/tree/feedback');

	const session = cookies.get('session')?.value

	// const isAuthPage = url.includes('/auth/*')
	// const isNewEmailPage = url.includes('/auth/new-email')
	// const isExistsPage = url.includes('/api/oauth/callback/google')

	// if(isExistsPage) {
	// 	return NextResponse.redirect(new URL('/auth/exists', url))
	// }

	if(pathname) {
		return NextResponse.redirect(new URL('/', url));
	}

	if(feedback) {
		return NextResponse.redirect(new URL('/tree', url));
	}

	// if (isAuthPage && !isNewEmailPage) {
	// 	if (session) {
	// 		return NextResponse.redirect(new URL('/dashboard/settings', url))
	// 	}

	// 	return NextResponse.next()
	// }

	// if (!session) {
	// 	return NextResponse.redirect(new URL('/auth/login', url))
	// }
}

export const config = {
	matcher: ['/auth/:path*', '/dashboard/:path*', '/tree/:path*']
}
