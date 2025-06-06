import axios from 'axios'
import { instance } from '@/api/axios'
import type { IPaginationParams } from '@/types/pagination.types'
import type { IVideoFormData } from '@/types/studio-videos.types'
import type { IStudioVideoResponse, IVideosPagination } from '@/types/video.types'

class StudioVideoService {
	private _VIDEOS = '/studio/videos'

	/* ----------------------------- Get All Videos ----------------------------- */
	async getAll(params?: IPaginationParams) {
		const { data } = await instance.get<IVideosPagination>(this._VIDEOS, {
			params
		})
		return data
	}

	/* ----------------------------- Get Video By Id ---------------------------- */
	async byId(id: string) {
		try {
			const { data } = await instance.get<IStudioVideoResponse>(`${this._VIDEOS}/${id}`)
			return data
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.response?.status === 404) {
					return null
				}
			}
			console.error('Failed to fetch video by id:', error)
			throw error
		}
	}

	/* --------------------------------- Create --------------------------------- */
	async create(dto: IVideoFormData) {
		const { data } = await instance.post(this._VIDEOS, dto)
		return data
	}

	/* --------------------------------- Update --------------------------------- */
	async update(id: string, dto: IVideoFormData) {
		const { data } = await instance.put(`${this._VIDEOS}/${id}`, dto)
		return data
	}

	/* --------------------------------- Delete --------------------------------- */
	async delete(id: string) {
		const { data } = await instance.delete(`${this._VIDEOS}/${id}`)
		return data
	}
}
export const studioVideoService = new StudioVideoService()
