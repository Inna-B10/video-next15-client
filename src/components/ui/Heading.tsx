import cn from 'clsx'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

interface Props {
	children: ReactNode
	Icon?: LucideIcon
	isPageHeading?: boolean
}

export function Heading({ children, Icon, isPageHeading = false }: Props) {
	return (
		<div
			className={cn(
				'text-primary flex items-center',
				isPageHeading ? 'gap-2.5 mb-8' : 'gap-1.5 mb-6'
			)}
		>
			{Icon && <Icon />}
			<h2 className='font-philosopher font-bold text-2xl'>{children}</h2>
		</div>
	)
}
