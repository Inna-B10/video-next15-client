import cn from 'clsx'
import type { TextareaHTMLAttributes } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label: string
	error?: string
	registration: UseFormRegisterReturn
}

export function Textarea({ label, error, registration, ...props }: Props) {
	return (
		<div className='mb-4'>
			<label>
				<span className='block text-grey-400 font-medium mb-2'>{label}</span>
				<textarea
					className={cn(
						'w-full px-3 py-2 bg-field text-xs border rounded shadow-sm transition-colors  resize-none focus:outline-none focus:ring-0 focus:border-primary',
						error ? 'border-red-600' : 'border-border '
					)}
					{...registration}
					{...props}
				/>
			</label>
			{error && <p className='text-red-600 text-sm mt-1'>{error}</p>}
		</div>
	)
}
