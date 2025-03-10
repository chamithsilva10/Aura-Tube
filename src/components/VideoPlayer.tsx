import React, { useState, useEffect } from 'react';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  channel: string;
  views: string;
  timestamp: string;
}

interface Comment {
  id: string;
  text: string;
  user: string;
  userProfileLogo: string;
}

const VideoPlayer: React.FC<{ videoId: string }> = ({ videoId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isDisliked, setIsDisliked] = useState<boolean>(false);
  const [suggestedVideos, setSuggestedVideos] = useState<Video[]>([]);

  // Fetch suggested videos
  useEffect(() => {
    const fetchSuggestedVideos = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${videoId}&type=video&maxResults=5&key=YOUR_API_KEY`
        );
        const data = await response.json();

        console.log('API Response:', data); // Log the API response

        if (!response.ok) {
          throw new Error(data.error?.message || 'Failed to fetch suggested videos');
        }

        const fetchedVideos = data.items.map((item: any) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.high.url,
          channel: item.snippet.channelTitle,
          views: 'N/A', // Views are not available in the search API response
          timestamp: item.snippet.publishedAt,
        }));

        console.log('Fetched Videos:', fetchedVideos); // Log the fetched videos

        setSuggestedVideos(fetchedVideos);
      } catch (error) {
        console.error('Error fetching suggested videos:', error);
      }
    };

    fetchSuggestedVideos();
  }, [videoId]);

  // Fetch comments for the video
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=YOUR_API_KEY`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error?.message || 'Failed to fetch comments');
        }

        const fetchedComments = data.items.map((item: any) => ({
          id: item.id,
          text: item.snippet.topLevelComment.snippet.textDisplay,
          user: item.snippet.topLevelComment.snippet.authorDisplayName,
          userProfileLogo: item.snippet.topLevelComment.snippet.authorProfileImageUrl || 'https://via.placeholder.com/40', // Fallback to placeholder if no profile logo
        }));

        setComments(fetchedComments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [videoId]);

  // Handle new comment submission
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      try {
        // Mock API call to post a comment (replace with actual API call)
        const newCommentObj: Comment = {
          id: String(comments.length + 1),
          text: newComment,
          user: 'CurrentUser', // Replace with actual user
          userProfileLogo: 'https://via.placeholder.com/40', // Replace with actual user profile logo
        };

        setComments([...comments, newCommentObj]);
        setNewComment('');
      } catch (error) {
        console.error('Error posting comment:', error);
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row p-4">
      {/* Video Player and Details */}
      <div className="lg:w-2/3">
        <div className="w-full">
          <iframe
            width="100%"
            height="500"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Video Details */}
        <div className="mt-4">
          <h1 className="text-xl font-bold">Video Title</h1>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center">
              <img
                src="https://via.placeholder.com/40"
                alt="Channel Logo"
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-2">
                <p className="font-semibold">Channel Name</p>
                <p className="text-sm text-gray-500">1M subscribers</p>
              </div>
              <button
                className={`ml-4 px-4 py-2 rounded-full ${
                  isSubscribed ? 'bg-gray-300' : 'bg-red-600 text-white'
                }`}
                onClick={() => setIsSubscribed(!isSubscribed)}
              >
                {isSubscribed ? 'Subscribed' : 'Subscribe'}
              </button>
            </div>
            <div className="flex items-center">
              <button
                className={`flex items-center px-4 py-2 rounded-full ${
                  isLiked ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}
                onClick={() => {
                  setIsLiked(!isLiked);
                  if (isDisliked) setIsDisliked(false);
                }}
              >
                <span className="mr-2">{isLiked ? 'Liked' : 'Like'}</span>
                <span>👍</span>
              </button>
              <button
                className={`flex items-center px-4 py-2 rounded-full ml-2 ${
                  isDisliked ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}
                onClick={() => {
                  setIsDisliked(!isDisliked);
                  if (isLiked) setIsLiked(false);
                }}
              >
                <span className="mr-2">{isDisliked ? 'Disliked' : 'Dislike'}</span>
                <span>👎</span>
              </button>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Comments</h2>
          <form onSubmit={handleCommentSubmit} className="mt-4">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full p-2 border rounded-lg"
            />
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Submit
            </button>
          </form>
          <div className="mt-4 space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex items-start">
                <img
                  src={comment.userProfileLogo}
                  alt="User"
                  className="w-8 h-8 rounded-full"
                />
                <div className="ml-2">
                  <p className="font-semibold">{comment.user}</p>
                  <p className="text-sm">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Suggested Videos */}
      <div className="lg:w-1/3 lg:ml-4 mt-6 lg:mt-0">
        <h2 className="text-lg font-semibold">Suggested Videos</h2>
        <div className="mt-4 space-y-4 overflow-y-auto max-h-screen">
          {suggestedVideos.map((video) => (
            <div key={video.id} className="flex cursor-pointer">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-40 h-24 object-cover rounded-lg"
              />
              <div className="ml-2">
                <p className="font-semibold">{video.title}</p>
                <p className="text-sm text-gray-500">{video.channel}</p>
                <p className="text-sm text-gray-500">
                  {video.views} views • {video.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;