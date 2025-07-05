import type { NextApiRequest, NextApiResponse } from 'next';
import { LocalDB } from '../../data/LocalDb';
import { Post } from '../../models/Post';
import { v4 as uuidv4 } from 'uuid';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Use query param for date
    
    const { date } = req.query;
    if (!date || typeof date !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid date parameter' });
    }
    const posts = LocalDB.instance.GetPosts(date) || [];
    return res.status(200).json(posts);
  }

  if (req.method === 'POST') {
    const { song, mood, lyric, songLink } = req.body;
    if (!song || !mood) {
      return res.status(400).json({ error: 'Missing song or mood' });
    }
    const newPost = new Post(
      uuidv4(),
      song,
      mood,
      lyric || 'Lyrics are unavailable',
      songLink || 'Link is unavailable'
    );
    LocalDB.instance.AddPost(newPost);
    return res.status(201).json(newPost);
  }

  return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}
