import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Home,
  PlusSquare,
  Compass,
  Heart,
  MessageCircle,
  Bookmark,
  Send,
  MoreHorizontal,
  Smile,
} from "lucide-react";

// Helper function from shadcn/ui to merge classes
import { cn } from "@/lib/utils";

// Story Circle Component
const StoryCircle = ({ username, avatar, hasStory = true, isOwn = false, className }) => {
  return (
    <div className={cn("flex flex-col items-center space-y-1", className)}>
      <div
        className={cn(
          "p-0.5 rounded-full",
          hasStory ? "bg-gradient-to-tr from-yellow-400 via-red-500 to-pink-500" : "bg-gray-200",
          isOwn && "bg-gray-300"
        )}
      >
        <div className="bg-white p-0.5 rounded-full">
          <Avatar className="w-14 h-14">
            <AvatarImage src={avatar} alt={username} />
            <AvatarFallback>{username[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <span className="text-xs text-gray-600 text-center max-w-[70px] truncate">
        {isOwn ? "Your story" : username}
      </span>
    </div>
  );
};

// Post Card Component
const PostCard = ({ post, className }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked || false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [comment, setComment] = useState("");

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className={cn("bg-white border border-gray-200 rounded-lg", className)}>
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={post.avatar} alt={post.username} />
            <AvatarFallback>{post.username[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="font-semibold text-sm">{post.username}</span>
        </div>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>

      {/* Post Image */}
      <div className="aspect-square bg-gray-100">
        <img src={post.image} alt="Post" className="w-full h-full object-cover" />
      </div>

      {/* Post Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={handleLike} className="p-0">
              <Heart className={cn("w-6 h-6", isLiked && "fill-red-500 text-red-500")} />
            </Button>
            <Button variant="ghost" size="icon" className="p-0">
              <MessageCircle className="w-6 h-6" />
            </Button>
            <Button variant="ghost" size="icon" className="p-0">
              <Send className="w-6 h-6" />
            </Button>
          </div>
          <Button variant="ghost" size="icon" onClick={handleBookmark} className="p-0">
            <Bookmark className={cn("w-6 h-6", isBookmarked && "fill-current")} />
          </Button>
        </div>

        {/* Likes */}
        <div className="mb-2">
          <span className="font-semibold text-sm">{likesCount.toLocaleString()} likes</span>
        </div>

        {/* Caption */}
        <div className="mb-2">
          <span className="font-semibold text-sm mr-2">{post.username}</span>
          <span className="text-sm">{post.caption}</span>
        </div>

        {/* Comments */}
        {post.comments > 0 && (
          <button className="text-sm text-gray-500 mb-2">
            View all {post.comments} comments
          </button>
        )}

        {/* Time */}
        <div className="text-xs text-gray-500 mb-3">{post.timeAgo}</div>

        {/* Add Comment */}
        <div className="flex items-center space-x-2 pt-2 border-t border-gray-100">
          <Smile className="text-gray-500" />
          <Input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 border-none p-0 h-auto focus-visible:ring-0 text-sm bg-transparent"
          />
          {comment && (
            <Button variant="ghost" size="sm" className="text-blue-500 font-semibold p-0 h-auto">
              Post
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};


// Forum Page Component
export default function ForumPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const stories = [
      { username: "Your story", avatar: "/placeholder.svg", isOwn: true, hasStory: false },
      { username: "john_doe", avatar: "/placeholder.svg", hasStory: true },
      { username: "jane_smith", avatar: "/placeholder.svg", hasStory: true },
      { username: "mike_wilson", avatar: "/placeholder.svg", hasStory: true },
      { username: "sarah_jones", avatar: "/placeholder.svg", hasStory: true },
      { username: "alex_brown", avatar: "/placeholder.svg", hasStory: true },
      { username: "emma_davis", avatar: "/placeholder.svg", hasStory: true },
      { username: "ryan_miller", avatar: "/placeholder.svg", hasStory: true },
    ];
  
    const posts = [
      {
        id: "1",
        username: "john_doe",
        avatar: "/placeholder.svg",
        image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=500&h=500&fit=crop",
        caption: "Beautiful sunset at the beach 🌅 #nature #photography",
        likes: 234,
        comments: 12,
        timeAgo: "2 hours ago",
        isLiked: false,
        isBookmarked: false,
      },
      {
        id: "2",
        username: "jane_smith",
        avatar: "/placeholder.svg",
        image: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=500&h=500&fit=crop",
        caption: "Delicious breakfast to start the day! 🥐☕",
        likes: 189,
        comments: 23,
        timeAgo: "4 hours ago",
        isLiked: true,
        isBookmarked: true,
      },
      {
        id: "3",
        username: "mike_wilson",
        avatar: "/placeholder.svg",
        image:
          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=500&fit=crop",
        caption: "New office space looks amazing! 💼 #workspace #productivity",
        likes: 456,
        comments: 34,
        timeAgo: "6 hours ago",
        isLiked: false,
        isBookmarked: false,
      },
    ];
  
    const suggestions = [
      { username: "photographer_alex", name: "Alex Thompson", avatar: "/placeholder.svg" },
      { username: "travel_enthusiast", name: "Maria Garcia", avatar: "/placeholder.svg" },
      { username: "fitness_guru", name: "David Lee", avatar: "/placeholder.svg" },
    ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Forum</h1>

            {/* Search */}
            <div className="relative max-w-xs w-full hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className="pl-10 bg-gray-50 border-gray-200"
              />
            </div>

            {/* Navigation */}
            <div className="flex items-center space-x-2">
              <Link to="/">
                <Button variant="ghost" size="icon">
                  <Home />
                </Button>
              </Link>
              <Link to="/chat"> {/* Assuming chat page is at /chat */}
                <Button variant="ghost" size="icon">
                  <MessageCircle />
                </Button>
              </Link>
              <Button variant="ghost" size="icon">
                <PlusSquare />
              </Button>
              <Button variant="ghost" size="icon">
                <Compass />
              </Button>
              <Button variant="ghost" size="icon">
                <Heart />
              </Button>
              <Avatar className="w-8 h-8 cursor-pointer">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stories */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex space-x-4 overflow-x-auto pb-2 -mx-4 px-4">
                {stories.map((story, index) => (
                  <StoryCircle
                    key={index}
                    username={story.username}
                    avatar={story.avatar}
                    hasStory={story.hasStory}
                    isOwn={story.isOwn}
                    className="flex-shrink-0"
                  />
                ))}
              </div>
            </div>

            {/* Posts */}
            <div className="space-y-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block space-y-6">
            {/* User Profile */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-4">
                    <Avatar className="w-14 h-14">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="font-semibold text-sm">your_username</h3>
                        <p className="text-gray-600 text-sm">Your Name</p>
                    </div>
                </div>
            </div>
            
            {/* Suggestions */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-600 text-sm">Suggestions for you</h3>
                <Button variant="ghost" className="text-xs font-semibold text-gray-800 p-0 h-auto">See All</Button>
              </div>
              <div className="space-y-3">
                {suggestions.map((user, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.username[0]?.toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-sm">{user.username}</p>
                        <p className="text-gray-600 text-xs">{user.name}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost" className="text-blue-500 text-xs font-semibold">
                      Follow
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="text-xs text-gray-400 space-y-2 pt-4">
              <p className="space-x-2">
                <a href="#" className="hover:underline">About</a>
                <a href="#" className="hover:underline">Help</a>
                <a href="#" className="hover:underline">Press</a>
                <a href="#" className="hover:underline">API</a>
                <a href="#" className="hover:underline">Jobs</a>
              </p>
              <p>© 2024 FORUM FROM ME</p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
} 