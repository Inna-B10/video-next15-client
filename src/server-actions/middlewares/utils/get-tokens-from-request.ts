import { AxiosError } from 'axios'
import type { NextRequest } from 'next/server'
import { authService } from '@/services/auth.service'
import { EnumTokens } from '@/types/auth.types'

export async function getTokensFromRequest(request: NextRequest) {
	const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value
	let accessToken = request.cookies.get(EnumTokens.ACCESS_TOKEN)?.value

	if (!refreshToken) {
		request.cookies.delete(EnumTokens.ACCESS_TOKEN)
		return null
	}

	if (!accessToken) {
		try {
			const data = await authService.getNewTokensByRefresh(refreshToken)
			accessToken = data.accessToken
		} catch (error) {
			if (error instanceof AxiosError) {
				if (error.message === 'invalid token') {
					console.log('invalid token')
					request.cookies.delete(EnumTokens.ACCESS_TOKEN)
					return null
				}
			}
			//[TODO] ? error message/notification
			return null
		}
	}

	return { accessToken, refreshToken }
}
