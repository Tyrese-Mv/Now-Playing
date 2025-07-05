import React, { useState } from "react";
import { Post } from "@/models/Post";
import { SongEmbed } from "@/components/SongEmbed";

function getFormattedDate(dateObj?: Date): string {
  const date = dateObj || new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

const moodColors = {
  happy: "bg-gradient-to-r from-yellow-400 to-orange-400",
  sad: "bg-gradient-to-r from-blue-400 to-purple-400",
  nostalgic: "bg-gradient-to-r from-pink-400 to-rose-400",
  energetic: "bg-gradient-to-r from-green-400 to-emerald-400",
  calm: "bg-gradient-to-r from-cyan-400 to-blue-400",
  romantic: "bg-gradient-to-r from-pink-400 to-red-400",
  melancholic: "bg-gradient-to-r from-gray-400 to-slate-400",
  excited: "bg-gradient-to-r from-orange-400 to-red-400",
  peaceful: "bg-gradient-to-r from-teal-400 to-green-400",
  intense: "bg-gradient-to-r from-purple-400 to-indigo-400"
};

export default function Home() {
  const [song, setSong] = useState("");
  const [mood, setMood] = useState("");
  const [lyric, setLyric] = useState("");
  const [songLink, setSongLink] = useState("");
  const [date, setDate] = useState(() => getFormattedDate());
  const [entries, setEntries] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchEntries = async (date: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/posts?date=${encodeURIComponent(date)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (res.ok) {
        const data = await res.json();
        setEntries(data || []);
      } else {
        setEntries([]);
      }
    } catch {
      setEntries([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ song, mood, lyric, songLink })
      });
      
      setSong("");
      setMood("");
      setLyric("");
      setSongLink("");
      fetchEntries(date);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [yyyy, mm, dd] = e.target.value.split('-');
    const formatted = `${parseInt(dd, 10)}/${parseInt(mm, 10)}/${yyyy}`;
    setDate(formatted);
    fetchEntries(formatted);
  };

  React.useEffect(() => {
    fetchEntries(date);
  }, []);

  const getMoodColor = (mood: string) => {
    const moodKey = mood.toLowerCase() as keyof typeof moodColors;
    return moodColors[moodKey] || "bg-gradient-to-r from-gray-400 to-slate-400";
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-800'
    }`}>
      {/* Header */}
      <header className="relative z-10 backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Now Playing in My Head
          </h1>
          
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              darkMode ? 'bg-purple-600' : 'bg-gray-200'
            }`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              darkMode ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Description */}
        <p className="text-center text-lg mb-12 opacity-80 max-w-2xl mx-auto leading-relaxed">
          A lightweight, personal audio diary where each day you log a song stuck in your head, 
          attach a mood, maybe a lyric, and later view past entries by date.
        </p>

        {/* Form */}
        <div className="backdrop-blur-md bg-white/20 rounded-2xl p-8 mb-12 border border-white/20 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Song Title</label>
                <input
                  type="text"
                  placeholder="What's playing in your head?"
                  value={song}
                  onChange={e => setSong(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm 
                           placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 
                           transition-all duration-200"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Mood</label>
                <input
                  type="text"
                  placeholder="How does it make you feel?"
                  value={mood}
                  onChange={e => setMood(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm 
                           placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 
                           transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Lyric (optional)</label>
              <input
                type="text"
                placeholder="A line that resonates with you..."
                value={lyric}
                onChange={e => setLyric(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm 
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 
                         transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Song Link (optional)</label>
              <input
                type="url"
                placeholder="YouTube, Spotify, or any music link..."
                value={songLink}
                onChange={e => setSongLink(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm 
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 
                         transition-all duration-200"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold 
                       py-4 px-8 rounded-xl hover:from-purple-700 hover:to-pink-700 
                       transform hover:scale-105 transition-all duration-200 disabled:opacity-50 
                       disabled:cursor-not-allowed shadow-lg"
            >
              {isSubmitting ? "Saving..." : "Log This Song"}
            </button>
          </form>
        </div>

        {/* Date Selector */}
        <div className="backdrop-blur-md bg-white/10 rounded-xl p-6 mb-8 border border-white/20">
          <label className="block text-sm font-medium mb-3">View entries by date:</label>
          <input
            type="date"
            value={(() => {
              const [d, m, y] = date.split('/');
              const pad = (n: string) => n.length === 1 ? `0${n}` : n;
              return `${y}-${pad(m)}-${pad(d)}`;
            })()}
            onChange={handleDateChange}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm 
                     focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
          />
        </div>

        {/* Entries */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center mb-8">Entries for {date}</h2>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            </div>
          ) : entries.length === 0 ? (
            <div className="text-center py-12 opacity-60">
              <p className="text-lg">No entries for this date.</p>
              <p className="text-sm mt-2">Start your audio diary by logging a song above.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {entries.map((entry, idx) => (
                <div
                  key={entry.id || idx}
                  className="backdrop-blur-md bg-white/20 rounded-2xl p-8 border border-white/20 
                           shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white">{entry.song}</h3>
                    <span className={`px-4 py-2 rounded-full text-white text-sm font-medium ${getMoodColor(entry.mood)}`}>
                      {entry.mood}
                    </span>
                  </div>
                  
                  {entry.lyric && (
                    <blockquote className="text-xl italic text-white/90 mb-6 leading-relaxed">
                      &quot;{entry.lyric}&quot;
                    </blockquote>
                  )}
                  
                  <SongEmbed url={entry.songLink} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
