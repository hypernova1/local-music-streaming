import { Entity, PrimaryColumn } from 'typeorm';

@Entity({
	comment: '오디오 파일',
	name: 'audio_file',
})
export default class AudioFile {
	@PrimaryColumn({
		comment: '오디오 아이디',
		name: 'audio_id',
		type: 'bigint',
		unsigned: true,
	})
	audioId: number;

	@PrimaryColumn({
		comment: '파일 아이디',
		name: 'file_id',
		type: 'bigint',
		unsigned: true,
	})
	fileId: number;
}