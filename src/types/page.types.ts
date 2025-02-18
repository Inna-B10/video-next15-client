export interface IPageProps<T> {
	params: T
}

export type TPageSlugProp = IPageProps<Promise<{ slug: string }>>

export type TPageIdProp = IPageProps<{ id: string }>
export type TPagePublicIdProp = IPageProps<{ publicId: string }>
