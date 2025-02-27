import { instance } from '@/api/axios'
import type { ISettingsData } from '@/types/settings.types'
import type { IProfileResponse } from '@/types/user.types'

class UserService {
	private _USERS = '/users'

	/* ------------------------------- GetProfile ------------------------------- */
	async getProfile() {
		const { data } = await instance.get<IProfileResponse>(`${this._USERS}/profile`)
		return data
	}
	/* ------------------------------ UpdateProfile ----------------------------- */
	async updateProfile(settings: ISettingsData) {
		const { data } = await instance.put<boolean>(`${this._USERS}/profile`, settings)
		return data
	}
	/* ------------------------------- ToggleLike ------------------------------- */
	async toggleLike(videoId: string) {
		const { data } = await instance.put(`${this._USERS}/profile/likes`, { videoId })
		return data
	}
}

export const userService = new UserService()
