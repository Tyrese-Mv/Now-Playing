import { DB } from "../util/types";
import { Post } from "../models/Post";

export class LocalDB{
    static #instance: LocalDB;
    private database: DB = {};

    private constructor() {
    }

    public static get instance(): LocalDB {
        if (!LocalDB.#instance) {
            LocalDB.#instance = new LocalDB();
        }

        return LocalDB.#instance;
    }

    public AddPost(userPost : Post): void{
        const taskKey = userPost.GetDateAsKey();

        if (!this.database[taskKey]) {
            this.database[taskKey] = [];
        }
    
        this.database[taskKey].push(userPost);
    }

    public GetDBKeys(): string[]{
        return Object.keys(this.database)
    }

    public GetPosts(date: string): Post[]{
        return this.database[date];
    }
    

    public toString(): string {
        return JSON.stringify(this.database, null, 2);
    }
}