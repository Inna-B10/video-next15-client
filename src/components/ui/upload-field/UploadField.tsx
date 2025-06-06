import { UploadCloud } from 'lucide-react'
import { useId } from 'react'
import type { FieldError } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { ImagePreview } from './ImagePreview'
import { useUpload } from './useUpload'

interface Props {
	folder?: string
	value?: string
	onChange: (url: string) => void
	label: string
	error?: FieldError
	className?: string
	isImage?: boolean
	overlay?: string
	sizePreview?: [number, number]
	classNameButton?: string
	help?: string
}

export function UploadField({
	folder,
	value,
	onChange,
	label,
	error,
	className,
	isImage = true,
	overlay,
	sizePreview,
	classNameButton,
	help
}: Props) {
	const { isLoading, uploadFile } = useUpload({
		folder,
		onChange: (...event) => onChange(event[0] as string)
	})
	const inputId = useId()

	return (
		<div className={className}>
			<label
				htmlFor={inputId}
				className='block text-gray-200 font-medium mb-2'
			>
				{label} <span className='text-xs font-normal tracking-wide'>{help}</span>
			</label>
			<label
				htmlFor={inputId}
				className={twMerge(
					'flex items-center px-[1rem] py-2 bg-field border border-primary text-white text-xs rounded cursor-pointer hover:bg-primary hover:text-field font-bold transition-colors duration-300 w-max',
					classNameButton
				)}
			>
				<UploadCloud
					className='mr-2'
					size={16}
				/>
				Upload
			</label>
			<input
				id={inputId}
				type='file'
				name='uploadImage'
				onChange={uploadFile}
				accept='image/*'
				className='hidden'
			/>
			{error && <p className='text-red-600 text-sm mt-1'>{error.message}</p>}

			{isImage && (
				<ImagePreview
					isLoading={isLoading}
					overlay={overlay}
					value={value}
					sizePreview={sizePreview}
				/>
			)}
		</div>
	)
}
