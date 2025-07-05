import { v4 as uuidv4 } from 'uuid';
import { LocalDB } from '@/data/LocalDb';
import { Post } from '@/models/Post';

export const getAllPosts = (date: string) => {
    
    return LocalDB.instance.GetPosts(date);
};
  
export const createPost = (song: string, mood: string, lyrics?: string, songLink?: string): void => {
    const newPost = new Post(
      uuidv4(),
      song,
      mood,
      lyrics || "Lyrics are unavailable",
      songLink || "Link is unavailable"
    );
    return LocalDB.instance.AddPost(newPost);
};