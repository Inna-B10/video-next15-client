import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { Heading } from '@/ui/Heading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { VerifiedBadge } from '@/ui/VerifiedBadge'
import { PAGE } from '@/config/public-page.config'
import { transformCount } from '@/utils/transform-count'
import type { ISingleVideoResponse } from '@/types/video.types'

const DynamicSubscribeButton = dynamic(
	() => import('@/components/SubscribeButton').then(mod => mod.SubscribeButton),
	{
		ssr: false,
		loading: () => <SkeletonLoader className='w-36 h-10 rounded-md' />
	}
)

export function VideoChannel({ video }: { video: ISingleVideoResponse }) {
	return (
		<div className='flex items-center justify-between my-4'>
			<div className='flex gap-4 items-end'>
				<Link
					href={PAGE.CHANNEL(video.channel.slug)}
					title={`Open ${video.channel.user.name} channel`}
					aria-label={`Open ${video.channel.user.name} channel`}
				>
					<Image
						alt={video.channel.user.name || ''}
						src={video.channel.user.avatarUrl || '/images/default/default-avatar.png'}
						width={55}
						height={55}
						priority
						className='rounded flex-shrink-0 shadow-md'
					/>
				</Link>
				<div>
					<Link
						href={PAGE.CHANNEL(video.channel.slug)}
						title={`Open ${video.channel.user.name} channel`}
						aria-label={`Open ${video.channel.user.name} channel`}
					>
						<Heading
							hTag='h3'
							className='m-0 text-xl'
						>
							{video.channel.user.name}{' '}
							{video.channel.isVerified && (
								<sup>
									<VerifiedBadge size={12} />
								</sup>
							)}
						</Heading>
					</Link>

					<div className='text-gray-400 text-xs whitespace-nowrap flex items-center gap-1'>
						{transformCount(video.channel.subscribers.length)} subscribers
					</div>
				</div>
			</div>
			{/*  ---------------------------- Button Subscribe ----------------------------  */}
			<DynamicSubscribeButton
				slug={video.channel.slug}
				videoChannelSlug={video.channel.slug}
			/>
		</div>
	)
}
