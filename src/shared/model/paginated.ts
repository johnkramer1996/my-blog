export type Paginated<T> = {
	count: number
	limit: number
	page: number
	lastPage: number
	data: T[]
}
