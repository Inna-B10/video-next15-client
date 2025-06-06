'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Edit } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { Heading } from '@/ui/Heading'
import { Button } from '@/ui/button/Button'
import { STUDIO_PAGE } from '@/config/studio-page.config'
import NotFoundPage from '@/app/not-found'
import { VideoForm } from '@/app/studio/upload/VideoForm'
import { studioVideoService } from '@/services/studio/studio-video.service'
import type { IVideoFormData } from '@/types/studio-videos.types'

export function EditVideoForm() {
	const { id } = useParams()
	const router = useRouter()

	const form = useForm<IVideoFormData>({
		mode: 'onChange'
	})

	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ['get studio video details', id],
		queryFn: () => studioVideoService.byId(id as string)
	})

	useEffect(() => {
		if (isSuccess && data) {
			const initialVideoData = data
			form.reset({
				title: initialVideoData.title,
				description: initialVideoData.description,
				maxResolution: initialVideoData.maxResolution,
				thumbnailUrl: initialVideoData.thumbnailUrl,
				tags: initialVideoData.tags.map(tag => tag.name),
				videoFileName: initialVideoData.videoFileName
			})
		}
	}, [data, form, isSuccess])

	const queryClient = useQueryClient()

	const { mutate, isPending } = useMutation({
		mutationKey: ['edit the video'],
		mutationFn: (data: IVideoFormData) => studioVideoService.update(id as string, data),
		onSuccess: async () => {
			queryClient.invalidateQueries({
				queryKey: ['studioVideoList']
			})
			const { toast } = await import('react-hot-toast')
			toast.success('Video successfully updated!')

			router.push(STUDIO_PAGE.STUDIO_HOME)
		},
		async onError() {
			const { toast } = await import('react-hot-toast')
			toast.error('Updating video failed!')
		}
	})

	const onSubmit: SubmitHandler<IVideoFormData> = data => {
		mutate({
			...data,
			title: data.title.trim(),
			description: data.description.trim()
		})
	}

	if (!isLoading && (!isSuccess || !data)) {
		return NotFoundPage(false, 'Video')
	}

	return (
		<section className='mb-10 max-w-6xl'>
			<Heading
				Icon={Edit}
				isPageHeading
			>
				Updating video
			</Heading>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				name='videoUpload'
			>
				{/* ---------------------------------- Form */}
				<VideoForm
					form={form}
					isPending={isLoading || isPending}
				/>
				{/* ----------------------------- Publish Button */}
				<div className='text-center mt-[1.1rem]'>
					<Button
						type='submit'
						disabled={isPending}
						isLoading={isPending}
						title='Update video'
						aria-label='Update video'
					>
						Update
					</Button>
				</div>
			</form>
		</section>
	)
}
