import PageRequest from './page-request';

export default class PageResponse<T> {
	numberOfItems: number;
	hasNext: boolean;
	pageSize: number;
	totalPage: number;
	items: T[];

	constructor(numberOfItems: number, items: T[], pageRequest: PageRequest) {
		this.pageSize = pageRequest.size;
		this.numberOfItems = numberOfItems;
		this.totalPage = Math.ceil(numberOfItems / (pageRequest.size || 20));
		this.hasNext = this.totalPage > (pageRequest.page || 1);
		this.items = items;
	}

}