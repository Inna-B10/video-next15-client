import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	isLoading?: boolean
	children: ReactNode
}

export function Button({ children, isLoading, ...props }: Props) {
	return (
		<button
			className='py-2 px-10 bg-primaryDark text-field font-semibold rounded hover:bg-primary transition-colors disabled:bg-gray-400'
			disabled={isLoading || props.disabled}
			{...props}
		>
			{isLoading ? 'Loading...' : children}
		</button>
	)
}
