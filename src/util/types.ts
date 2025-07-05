import { Post } from "../models/Post";

export type PostKey = string;
export type PostStorage = Post[];

export interface DB {
    [key: PostKey]: PostStorage;
}