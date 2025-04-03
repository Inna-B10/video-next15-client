'use client'

import cn from 'clsx'
import { useState } from 'react'
import { Heading } from '@/ui/Heading'
import { VideoPlayer } from '@/ui/video-player/VideoPlayer'
import { SimilarVideos } from './SimilarVideos'
import { VideoDescription } from './description/VideoDescription'
import { VideoActions } from './video-actions/VideoActions'
import { VideoChannel } from './video-channel/VideoChannel'
import type { ISingleVideoResponse } from '@/types/video.types'

interface ISingleVideo {
	video: ISingleVideoResponse
}

export function SingleVideo({ video }: ISingleVideo) {
	const [isTheaterMode, setIsTheaterMode] = useState(false)
	return (
		<section className='grid grid-cols-[3fr_.8fr] gap-10 relative'>
			<div>
				<div
					className={cn(isTheaterMode ? 'absolute top-0 left-0 max-h-screen-screen' : 'relative')}
				>
					<VideoPlayer
						fileName={video.videoFileName}
						toggleTheaterMode={() => setIsTheaterMode(!isTheaterMode)}
					/>
				</div>

				<div
					className={cn('flex justify-between items-start pb-6 mb-6 border-b border-border', {
						'pt-[52rem]': isTheaterMode
					})}
				>
					{/*  ------------------------------- Video Title ------------------------------  */}
					<div>
						<Heading
							classNameHeading='text-[1.4rem]'
							className='mb-2 text-white'
						>
							{video.title}
						</Heading>
						<div className='text-gray-400 text-xs text-nowrap'>
							{video.viewsCount.toLocaleString()} views
						</div>
					</div>

					{/*  --------------------------- Save / Like Buttons --------------------------  */}
					<VideoActions video={video} />
				</div>

				{/*  ----------------------------- Channel Details ----------------------------  */}
				<VideoChannel video={video} />
				{/* ---------------------------- Video Description --------------------------- */}
				<VideoDescription description={video.description} />
			</div>
			{/*//[TODO] comments */}

			{/*  ----------------------------- Similar Videos -----------------------------  */}
			{!!video.similarVideos.length && (
				<div className={cn({ 'pt-[52rem]': isTheaterMode })}>
					<SimilarVideos videos={video.similarVideos} />
				</div>
			)}
		</section>
	)
}
