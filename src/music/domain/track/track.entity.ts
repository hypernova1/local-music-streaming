import AuditEntity from '../../../config/persistence/audit.entity';
import { Column, Entity, Index, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import AudioFile from './audio-file.entity';

@Entity({
	name: 'track',
	comment: '트랙 정보',
})
export default class Track extends AuditEntity {
	@PrimaryGeneratedColumn({
		comment: '아이디',
		name: 'id',
		type: 'bigint',
		unsigned: true,
	})
	id: number;

	@Column({
		comment: 'disk 번호',
		name: 'disk_no',
		type: 'integer',
		unsigned: true,
		nullable: true,
	})
	diskNo?: number;

	@Column({
		comment: '트랙 번호',
		name: 'track_no',
		type: 'integer',
		unsigned: true,
		default: 0,
		nullable: true,
	})
	trackNo: number;

	@Column({
		comment: '제목',
		name: 'title',
		type: 'varchar',
		nullable: true,
	})
	title: string;

	@Column({
		comment: '앨범 아이디',
		name: 'album_id',
		type: 'bigint',
		unsigned: true,
		nullable: true,
	})
	@Index()
	albumId: number;

	@Column({
		comment: '아티스트 아이디',
		name: 'artist_id',
		type: 'bigint',
		unsigned: true,
		nullable: true,
	})
	@Index()
	artistId: number;

	@Column({
		comment: '아티스트 아이디',
		name: 'play_time',
		type: 'float',
		unsigned: true,
		nullable: false,
	})
	playTime: number;

	@Column({
		comment: '재생수',
		name: 'hits',
		type: 'integer',
		unsigned: true,
		nullable: false,
		default: 0,
	})
	hits: number;

	@Column({
		comment: '가사',
		name: 'lyrics',
		type: 'text',
		nullable: true,
	})
	lyrics?: string;

	@OneToOne(() => AudioFile, (audioFile) => audioFile.track, { cascade: true })
	audioFile: AudioFile;

	protected constructor() {
		super();
	}

	static from(param: {
		diskNo?: number;
		trackNo: number;
		title: string,
		albumId: number,
		artistId: number,
		playTime: number,
		fileId: number,
		lyrics?: string
	}) {
		const track = new Track();
		track.diskNo = param.diskNo;
		track.trackNo = param.trackNo;
		track.title = param.title;
		track.albumId = param.albumId;
		track.artistId = param.artistId;
		track.playTime = param.playTime;
		track.lyrics = param.lyrics
		const audioFile = new AudioFile();

		audioFile.fileId = param.fileId;
		track.audioFile = audioFile;
		return track;
	}
}
