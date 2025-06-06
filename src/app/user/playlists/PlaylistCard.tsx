import * as m from 'framer-motion/m'
import { ListVideo } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { PAGE } from '@/config/public-page.config'
import type { IPlaylist } from '@/types/playlist.types'

interface Props {
	playlist: IPlaylist
}

export function PlaylistCard({ playlist }: Props) {
	return (
		<m.div
			className='mb-5 w-fit'
			whileHover='hover'
			initial='rest'
			animate='rest'
		>
			<div>
				<Link
					href={PAGE.PLAYLISTS(playlist.id)}
					title={`Open playlist: ${playlist.title}`}
					aria-label={`Open playlist: ${playlist.title}`}
					className='relative block group'
				>
					{/* ------------------------------ Dark Overlay ------------------------------ */}
					<m.div
						variants={{
							rest: { opacity: 0 },
							hover: { opacity: 0.6 }
						}}
						transition={{ duration: 0.3 }}
						className='absolute inset-0 bg-black rounded-md z-10 pointer-events-none'
					/>

					{/* ------------------------------- Back Cards ------------------------------- */}
					<div className='rounded-lg shadow-lg absolute h-full -right-[8px] -top-[7px] bg-gray-500/30 w-[calc(100%-4px)]' />
					<div className='rounded-md shadow-lg absolute h-full -right-[2px] -top-[2px] bg-gray-500/50 mt-[-2px] mr-[-2px] border-t border-r border-[#191B28] w-[calc(100%-2px)]' />

					{/* ------------------------------- Main Image ------------------------------- */}
					<Image
						src={playlist?.videos[0]?.thumbnailUrl || '/images/default/default-thumbnail.jpg'}
						width={250}
						height={140}
						quality={100}
						alt={playlist.title}
						className='rounded-md shadow-lg object-cover w-svw relative z-0 border-t border-r border-[#191B28]'
					/>

					{/* ------------------------------- Count Badge ------------------------------ */}
					<div className='flex items-center justify-center gap-1 absolute bottom-1 right-1.5 py-[1px] text-xs font-medium bg-amber-700/90 rounded text-white px-1 text-nowrap z-20'>
						{<ListVideo size={14} />} {playlist.videos.length}{' '}
						{playlist.videos.length > 1 ? 'videos' : 'video'}
					</div>
				</Link>

				{/* ---------------------------------- Title --------------------------------- */}
				<div className='mt-2 pl-2 font-medium'>
					<Link
						href={PAGE.PLAYLISTS(playlist.id)}
						className='line-clamp-2 leading-[1.3]'
						title={`Open playlist: ${playlist.title}`}
						aria-label={`Open playlist: ${playlist.title}`}
					>
						{playlist.title}
					</Link>
				</div>
			</div>
		</m.div>
	)
}
