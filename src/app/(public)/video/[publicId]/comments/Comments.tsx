import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { CommentItem } from './comment-item/CommentItem'
import { commentService } from '@/services/comment.service'
import type { ISingleVideoResponse } from '@/types/video.types'

const DynamicAddCommentsForm = dynamic(
	() => import('./AddCommentsForm').then(mod => mod.AddCommentsForm),
	{ ssr: false }
)

interface Props {
	video: ISingleVideoResponse
}

export function Comments({ video }: Props) {
	const { data, refetch } = useQuery({
		queryKey: ['comments', video.id],
		queryFn: () => commentService.byVideoPublicId(video.publicId),
		initialData: video.comments
	})

	return (
		<div className='border-t border-t-border mt-8'>
			{/* ---------------------------------- Form ---------------------------------- */}
			<DynamicAddCommentsForm
				videoId={video.id}
				refetch={refetch}
			/>
			{/* -------------------------------- Comments -------------------------------- */}
			{!!data &&
				data.map(comment => (
					<CommentItem
						key={comment.id}
						comment={comment}
						refetch={refetch}
					/>
				))}
		</div>
	)
}
