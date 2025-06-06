import { type Control, Controller } from 'react-hook-form'
import { UploadField } from '@/ui/upload-field/UploadField'
import type { ISettingsData } from '@/types/settings.types'

interface Props {
	control: Control<ISettingsData>
}

export function SettingsMediaFields({ control }: Props) {
	return (
		<div className='flex flex-col justify-between mb-6'>
			<Controller
				control={control}
				name='channel.avatarUrl'
				render={({ field: { onChange, value }, fieldState: { error } }) => (
					<UploadField
						label='Avatar: '
						help='preferred image dimensions 240 x 240'
						onChange={onChange}
						value={value}
						error={error}
						folder='avatars'
						className='mb-4'
					/>
				)}
			/>
			<Controller
				control={control}
				rules={{
					validate: value => !!value || 'Banner is required!'
				}}
				name='channel.bannerUrl'
				render={({ field: { onChange, value }, fieldState: { error } }) => (
					<UploadField
						label='Banner: '
						help='The overlay in the middle displays the content that will be visible on the site.'
						onChange={onChange}
						value={value}
						error={error}
						folder='banners'
						sizePreview={[458, 258]}
						overlay='/images/default/overlay.png'
					/>
				)}
			/>
		</div>
	)
}
