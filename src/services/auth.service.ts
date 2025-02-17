import Cookies from 'js-cookie'
import { clearAuthData, setAuthData } from '@/store/auth.slice'
import { axiosClassic } from '@/api/axios'
import { store } from '@/store'
import type { IAuthData } from '@/types/auth-form.types'
import { EnumTokens } from '@/types/auth.types'
import type { IUser } from '@/types/user.types'

interface IAuthResponse {
	user: IUser
	accessToken: string
}

class AuthService {
	private _AUTH = '/auth'

	async main(type: 'login' | 'register', data: IAuthData, recaptchaToken?: string | null) {
		const response = await axiosClassic.post<IAuthResponse>(`${this._AUTH}/${type}`, data, {
			headers: { recaptcha: recaptchaToken }
		})

		if (response.data.accessToken) {
			this._saveTokenToStorage(response.data.accessToken) //save token in cookies
			store.dispatch(setAuthData(response.data)) // save user's data to our global store
		}
		return response
	}

	/* ----------------------------- InitializeAuth / Re-login----------------------------- */
	//in cases when an accessToken (client) expired, try to get new using refreshToken (server), if unsuccessfully - clear all user data from store and all cookies

	async initializeAuth() {
		const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN)

		if (accessToken) return
		try {
			await this.getNewTokens() // try to get new tokens
		} catch (error) {
			console.log(error)
			store.dispatch(clearAuthData()) //delete user's data from global store
		}
	}

	/* -------------------------- GetNewTokens (Client cookie) ------------------------- */
	async getNewTokens() {
		const response = await axiosClassic.post<IAuthResponse>(`${this._AUTH}/access-token`)

		if (response.data.accessToken) {
			this._saveTokenToStorage(response.data.accessToken)
			store.dispatch(setAuthData(response.data))
		}
		return response
	}

	/* --------------------- GetNewTokensByRefresh (Server cookie) --------------------- */
	async getNewTokensByRefresh(refreshToken: string) {
		const response = await axiosClassic.post<IAuthResponse>(
			`${this._AUTH}/access-token`,
			{},
			{
				headers: {
					Cookie: `refreshToken=${refreshToken}`
				}
			}
		)
		return response.data
	}

	/* --------------------------------- Logout -------------------------------- */
	async logout() {
		const response = await axiosClassic.post<boolean>(`${this._AUTH}/logout`)

		if (response.data) {
			this.removeTokenFromStorage()
		}
		return response
	}

	/* ------------------------------- Save Token ------------------------------- */
	//[!] change domain for production
	private _saveTokenToStorage(accessToken: string) {
		Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
			domain: 'localhost',
			sameSite: 'strict',
			expires: 1 / 24 //1h
			// secure: true
		})
	}

	/* ------------------------------ Remove Token ------------------------------ */
	removeTokenFromStorage() {
		Cookies.remove(EnumTokens.ACCESS_TOKEN)
		store.dispatch(clearAuthData())
	}
}

export const authService = new AuthService()
