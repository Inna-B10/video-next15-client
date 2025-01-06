import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'

import './globals.scss'

const notoSans = Noto_Sans({
	// variable: '--font-noto-sans',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`${notoSans.className}  antialiased`}>{children}</body>
		</html>
	)
}
