import { useState, useEffect } from 'react';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  channel: string;
  views: string;
  timestamp: string;
}

const useYoutubeApi = (query: string): { videos: Video[]; loading: boolean; error: string | null } => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=${query}&key=AIzaSyCXObdBKHzSxSvhwMrMmK8gTsnSA2TAz1M`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error?.message || 'Failed to fetch videos');
        }

        const fetchedVideos = data.items.map((item: any) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.high.url,
          channel: item.snippet.channelTitle,
          views: 'N/A', // Views are not available in the search API response
          timestamp: item.snippet.publishedAt,
        }));

        setVideos(fetchedVideos);
      } catch (error) {
        console.error('Error fetching videos:', error);
        setError('Failed to fetch videos. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchVideos();
    }
  }, [query]);

  return { videos, loading, error };
};

export default useYoutubeApi;