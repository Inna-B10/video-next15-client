import { useQuery } from '@tanstack/react-query'
import { List } from 'lucide-react'
import { useParams } from 'next/navigation'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { VideoCardHorizontal } from '@/ui/video-card/VideoCardHorizontal'
import { SinglePlaylistHeader } from './playlist-header/SinglePlaylistHeader'
import { SaveToPlaylist } from '@/app/(public)/video/[publicId]/video-actions/SaveToPlaylist'
import NotFoundPage from '@/app/not-found'
import { playlistService } from '@/services/playlist.service'

export function SinglePlaylist() {
	const { id } = useParams()
	const { data, isLoading, refetch } = useQuery({
		queryKey: ['playlist', id],
		queryFn: () => playlistService.getPlaylistById(id as string),
		enabled: !!id
	})

	if (!data) {
		return NotFoundPage(false, 'Playlist')
	}

	return (
		<section className='w-3/4'>
			{/* ----------------------------- Playlist Header ---------------------------- */}
			<SinglePlaylistHeader
				Icon={
					<List
						size={24}
						className='mt-1'
					/>
				}
				playlist={data}
				refetch={refetch}
			/>

			<div>
				{isLoading ? (
					<SkeletonLoader
						count={3}
						className='h-36 rounded-md mb-8'
					/>
				) : data?.videos?.length ? (
					data?.videos?.map(video => (
						<div
							key={video.id}
							className='flex items-start gap-4 mb-8 justify-between rounded-md'
						>
							{/* ----------------------------- Horizontal Card ---------------------------- */}
							<VideoCardHorizontal video={video} />

							{/* ------------------------------ Video Actions ----------------------------- */}
							<SaveToPlaylist
								video={video}
								refetchSinglePlaylist={refetch}
							/>
						</div>
					))
				) : (
					<p>This playlist is empty!</p>
				)}
			</div>
		</section>
	)
}
