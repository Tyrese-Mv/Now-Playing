// import { v4 as uuidv4 } from 'uuid';

export class Post{
    id: string;
    song: string;
    lyric: string;
    mood: string;
    songLink: string;
    dateCreated: string;

    constructor (id: string, song: string, mood: string, lyrics: string, songLink: string){
        this.id = id;
        this.dateCreated = this.DateTimeParser();
        this.song = song;
        this.lyric = lyrics;
        this.mood = mood;
        this.songLink = songLink;
    }
    private DateTimeParser(): string{
        const CurrentDate: Date = new Date();
        const year = CurrentDate.getFullYear();
        const month = CurrentDate.getMonth() + 1;
        const day = CurrentDate.getDate();
        const hours = CurrentDate.getHours();
        const minutes = CurrentDate.getMinutes();

        return `${day}/${month}/${year} - ${hours}:${minutes}`
    }

    public GetDateAsKey(): string{
        return this.dateCreated.split(" - ")[0];
    }

    toString(): string {
        return `Post: { id: ${this.id}, song: ${this.song}, lyric: ${this.lyric}, mood: ${this.mood}, songLink: ${this.songLink} }`;
    }
}