export function stripHtml(html: string) {
	return html.replace(/<\/?[^>]+(>|$)/g, '')
}

export function stripHtmlWithBreak(html: string) {
	return html
		.replace(/<br\s*\/?>/gi, '\n')
		.replace(/<p>/gi, '\n\n')
		.replace(/<\/p>/gi, '\n\n')
		.replace(/<div>/gi, '\n')
		.replace(/<\/div>/gi, '\n')
		.replace(/<\/?[^>]+(>|$)/g, '')
		.replace(/\n{3,}/g, '\n\n')
}
