import { Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import Track from './track.entity';

@Entity({
	comment: '오디오 파일',
	name: 'audio_file',
})
export default class AudioFile {

	@OneToOne(() => Track, (track) => track.audioFile)
	@JoinColumn({
		name: 'track_id',
	})
	track: Track;

	@PrimaryColumn({
		comment: '오디오 아이디',
		name: 'track_id',
		type: 'bigint',
		unsigned: true,
	})
	trackId: number;

	@PrimaryColumn({
		comment: '파일 아이디',
		name: 'file_id',
		type: 'bigint',
		unsigned: true,
	})
	fileId: number;
}