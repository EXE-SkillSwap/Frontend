import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
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
    const [status, setStatus] = useState("");
    const [statusList, setStatusList] = useState([]);

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

  // Thêm status mới
  const handlePostStatus = () => {
    if (status.trim()) {
      setStatusList([{ text: status, time: new Date() }, ...statusList]);
      setStatus("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto px-4 py-6 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Up Status */}
            <div className="bg-white/80 border border-purple-100 rounded-lg p-4 shadow-sm mb-2">
              <div className="flex items-start gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Input
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                    placeholder="Bạn đang nghĩ gì? Hãy chia sẻ cảm xúc hoặc trạng thái của bạn..."
                    className="bg-purple-50 border border-purple-200 focus:border-purple-400 focus:ring-purple-200 rounded-full px-4 py-2 text-sm"
                  />
                </div>
                <Button
                  onClick={handlePostStatus}
                  className="bg-gradient-to-r from-purple-400 to-indigo-500 text-white rounded-full px-6 py-2 font-semibold shadow-md hover:from-purple-500 hover:to-indigo-600"
                  disabled={!status.trim()}
                >
                  Đăng
                </Button>
              </div>
              {/* Hiển thị status mới nhất */}
              {statusList.length > 0 && (
                <div className="mt-4 space-y-2">
                  {statusList.map((s, idx) => (
                    <div key={idx} className="bg-purple-50 border border-purple-100 rounded-lg px-4 py-2 text-sm text-purple-900 shadow-sm">
                      <span className="font-semibold mr-2">Bạn:</span>
                      {s.text}
                      <span className="ml-2 text-xs text-purple-400">{s.time.toLocaleTimeString()}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Stories */}
            <div className="bg-white/80 border border-purple-100 rounded-lg p-4">
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
            <div className="bg-white/80 border border-purple-100 rounded-lg p-4">
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
            <div className="bg-white/80 border border-purple-100 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-purple-600 text-sm">Suggestions for you</h3>
                <Button variant="ghost" className="text-xs font-semibold text-purple-800 p-0 h-auto">See All</Button>
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
                    <Button size="sm" variant="ghost" className="text-purple-500 text-xs font-semibold">
                      Follow
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
} 