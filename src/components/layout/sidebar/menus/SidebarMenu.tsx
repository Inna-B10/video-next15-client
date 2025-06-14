import { usePathname } from 'next/navigation'
import { match } from 'path-to-regexp'
import { PAGE } from '@/config/public-page.config'
import { MenuItem } from './MenuItem'
import { MyChannelMenuItem } from './MyChannelMenuItem'
import type { ISidebarItem } from '@/types/sidebar.types'

interface Props {
	title?: string
	menu: ISidebarItem[]
	isShowedSidebar: boolean
	isLoggedIn?: boolean
}

export function SidebarMenu({ title, menu, isShowedSidebar, isLoggedIn }: Props) {
	const pathname = usePathname()
	// const { isLoggedIn } = useTypedSelector(state => state.auth)

	/* ----------------------------------- Nav ---------------------------------- */
	return (
		<nav>
			{title && isShowedSidebar && (
				<div className='opacity-30 uppercase font-medium text-xs mb-3'>{title}</div>
			)}
			<ul>
				{menu.map(menuItem => {
					const props = {
						item: menuItem,
						isActive: !!match(menuItem.link)(pathname),
						isShowedSidebar: isShowedSidebar
					}
					// my-channel page
					const isMyChannel = menuItem.link === PAGE.MY_CHANNEL
					const isMyChannelItem = isMyChannel && isLoggedIn
					return isMyChannelItem ? (
						<MyChannelMenuItem
							key={menuItem.label}
							{...props}
						/>
					) : isMyChannel ? null : (
						<MenuItem
							key={menuItem.label}
							{...props}
						/>
					)
				})}
			</ul>
		</nav>
	)
}
