import type { EnumVideoPlayerQuality } from './video-player.types'

export interface IFileResponse {
	url: string
	name: string
	maxResolution?: EnumVideoPlayerQuality
}

export interface IProgressProcessingResponse {
	fileName: string
	status: number
}
