'use client'

import dynamic from 'next/dynamic'
import { SkeletonLoader } from '@/ui/SkeletonLoader'

const DynamicPlaylistsPage = dynamic(
	() => import('./PlaylistsPage').then(mod => mod.PlaylistsPage),
	{
		ssr: false,
		loading: () => (
			<div className='grid grid-cols-1  md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-14 mt-24'>
				<SkeletonLoader
					count={1}
					className='h-44 rounded-md'
				/>
			</div>
		)
	}
)

export function PlaylistsDynPage() {
	return <DynamicPlaylistsPage />
}
