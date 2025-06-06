import type { NextRequest } from 'next/server'
import { PAGE } from './config/public-page.config'
import { STUDIO_PAGE } from './config/studio-page.config'
import { protectLogin } from './server-actions/middlewares/protect-login.middleware'
import { protectStudio } from './server-actions/middlewares/protect-studio.middleware'

export async function middleware(request: NextRequest) {
	const url = new URL(request.url)
	const pathname = url.pathname

	if (pathname.includes(STUDIO_PAGE.STUDIO_HOME) || pathname.includes('/user')) {
		return protectStudio(request)
	}

	if (pathname.includes(PAGE.AUTH)) {
		return protectLogin(request)
	}
}

export const config = {
	matcher: ['/studio/:path*', '/auth/:path*', '/user/:path*']
}
