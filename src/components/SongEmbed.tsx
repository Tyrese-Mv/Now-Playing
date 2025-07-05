import React from 'react';

interface SongEmbedProps {
  url: string;
}

export const SongEmbed: React.FC<SongEmbedProps> = ({ url }) => {
  if (!url || url === "Link is unavailable") {
    return null;
  }

  // YouTube video ID extraction
  const getYouTubeVideoId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // Spotify track ID extraction
  const getSpotifyTrackId = (url: string): string | null => {
    const regExp = /spotify\.com\/track\/([a-zA-Z0-9]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const youtubeVideoId = getYouTubeVideoId(url);
  const spotifyTrackId = getSpotifyTrackId(url);

  if (youtubeVideoId) {
    return (
      <div className="mt-2">
        <iframe
          width="100%"
          height="200"
          src={`https://www.youtube.com/embed/${youtubeVideoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded"
        />
      </div>
    );
  }

  if (spotifyTrackId) {
    return (
      <div className="mt-2">
        <iframe
          style={{ borderRadius: '12px' }}
          src={`https://open.spotify.com/embed/track/${spotifyTrackId}`}
          width="100%"
          height="152"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>
    );
  }

  // Regular link for other URLs
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 underline text-sm mt-2 inline-block"
    >
      Listen
    </a>
  );
}; 