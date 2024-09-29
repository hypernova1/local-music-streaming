import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export default class AppController {

	@Get()
	@Render('view')
	getIndexPage() {
		return {
			genre: {
				displayName: '장르',
				rootUrl: '/genres',
			},
			artist: {
				displayName: '아티스트',
				rootUrl: '/artists',
			},
			track: {
				displayName: '전체 음악',
				rootUrl: '/tracks',
			}
		}
	}

}