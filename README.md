# 🎵 Now Playing in My Head

A lightweight, personal audio diary where each day you log a song stuck in your head, attach a mood, maybe a lyric, and later view past entries by date.

## ✨ Features

### 🎨 **Sleek Design**
- **Glassmorphism UI** with soft gradients and backdrop blur effects
- **Dark/Light Mode** toggle with smooth transitions
- **Mobile-first** responsive design optimized for on-the-go journaling
- **Modern typography** with elegant gradients and spacing

### 🎵 **Audio Integration**
- **YouTube Embedding** - Paste any YouTube URL to embed videos directly
- **Spotify Integration** - Share Spotify tracks with embedded players
- **Universal Links** - Regular URLs display as clickable links
- **Smart Detection** - Automatically detects and embeds supported platforms

### 💭 **Mood-Based Experience**
- **Color-coded Mood Badges** with gradient backgrounds
- **Emotional Expression** through visual design elements
- **Personal Reflection** with optional lyric quotes
- **Date-based Organization** for easy browsing

### 🔧 **Technical Features**
- **Next.js Architecture** with API routes
- **TypeScript** for type safety
- **In-memory Storage** with LocalDB singleton
- **RESTful API** design
- **Real-time Updates** with smooth animations

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd now-playing
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install UUID package** (if not already installed)
   ```bash
   npm install uuid @types/uuid
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage Guide

### Adding a New Entry
1. **Song Title** - Enter the name of the song in your head
2. **Mood** - Describe how the song makes you feel (e.g., happy, nostalgic, calm)
3. **Lyric** (optional) - Share a line that resonates with you
4. **Song Link** (optional) - Paste YouTube, Spotify, or any music URL
5. **Click "Log This Song"** to save your entry

### Viewing Past Entries
- Use the date picker to browse entries by specific dates
- Entries display with song title, mood badge, lyrics, and embedded media
- Empty dates show a gentle prompt to start journaling

### Supported Media Platforms
- **YouTube** - Full video embedding
- **Spotify** - Track player with album art
- **Other URLs** - Clickable links that open in new tabs

## 🏗️ Project Structure

```
src/
├── components/
│   └── SongEmbed.tsx          # Media embedding component
├── data/
│   └── LocalDb.ts             # In-memory database singleton
├── models/
│   └── Post.ts                # Post data model
├── pages/
│   ├── api/
│   │   └── posts.ts           # REST API endpoints
│   └── index.tsx              # Main application page
├── services/
│   └── PostService.ts         # Business logic layer
├── styles/                    # Global styles
├── util/
│   └── types.ts               # TypeScript type definitions
└── lib/                       # Utility libraries
```

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Storage**: In-memory LocalDB (singleton pattern)
- **Media**: YouTube/Spotify embed APIs
- **Build Tool**: Next.js built-in bundler

## 🎨 Design Philosophy

### **Lo-fi & Introspective**
- Soft, calming color palettes
- Minimalist interface focusing on content
- Emotional expression through visual design

### **Modern & Elegant**
- Glassmorphism effects for depth
- Smooth animations and transitions
- Responsive design for all devices

### **Personal & Intimate**
- Mood-based color coding
- Large, readable typography
- Spacious layout for comfortable reading

## 🔧 API Endpoints

### `GET /api/posts?date={date}`
Retrieves all posts for a specific date.

**Query Parameters:**
- `date` (string): Date in format `d/m/yyyy`

**Response:**
```json
[
  {
    "id": "uuid",
    "song": "Song Title",
    "lyric": "Optional lyric",
    "mood": "happy",
    "songLink": "https://...",
    "dateCreated": "9/6/2024 - 14:30"
  }
]
```

### `POST /api/posts`
Creates a new post entry.

**Request Body:**
```json
{
  "song": "Song Title",
  "mood": "happy",
  "lyric": "Optional lyric",
  "songLink": "https://..."
}
```

**Response:**
```json
{
  "id": "uuid",
  "song": "Song Title",
  "lyric": "Optional lyric",
  "mood": "happy",
  "songLink": "https://...",
  "dateCreated": "9/6/2024 - 14:30"
}
```

## 🎯 Future Enhancements

- [ ] **Persistent Storage** - Database integration
- [ ] **User Authentication** - Personal accounts
- [ ] **Export Features** - PDF/JSON export
- [ ] **Analytics** - Mood trends and insights
- [ ] **Social Features** - Share entries (optional)
- [ ] **Audio Recording** - Voice notes for songs
- [ ] **Playlist Generation** - Create mood-based playlists

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js** for the amazing React framework
- **Tailwind CSS** for the utility-first styling
- **YouTube & Spotify** for their embed APIs
- **The music community** for inspiration

---

**Made with ❤️ for music lovers and introspective souls**
