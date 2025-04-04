'use client'

import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import Tooltip from 'rc-tooltip'
import type { ReactElement } from 'react'
import { COLORS } from '@/constants/colors.constants'
import { getTime } from '../video-player.utils'

interface IHandleProps {
	value: number
	dragging: boolean
	index: number
}

const handleRender = (node: ReactElement, props: IHandleProps) => {
	const { value, dragging, index } = props
	return (
		<Tooltip
			prefixCls='rc-slider-tooltip'
			overlay={getTime(value)}
			visible={dragging}
			placement='top'
			key={index}
			// overlayClassName='tooltip-simple-text'
			classNames={{ root: 'tooltip-simple-text' }}
		>
			{node}
		</Tooltip>
	)
}
interface Props {
	currentTime: number
	duration: number
	onSeek: (time: number) => void
}

export function PlayerProgressBar({ currentTime, duration, onSeek }: Props) {
	return (
		<div className='w-full'>
			<Slider
				min={0}
				max={duration}
				value={currentTime}
				onChange={value => {
					if (typeof value === 'number') {
						onSeek(value)
					}
				}}
				handleRender={handleRender}
				styles={{
					track: { backgroundColor: COLORS.primary, height: 5 },
					rail: { backgroundColor: 'rbg(196 196 96 /60%)', height: 5 },
					handle: {
						borderColor: 'transparent',
						height: 16,
						width: 16,
						// marginLeft: -8,
						// marginTop: -4,
						backgroundColor: 'transparent',
						outline: 'none',
						boxShadow: 'none'
					}
				}}
			/>
		</div>
	)
}
