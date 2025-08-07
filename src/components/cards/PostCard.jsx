import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { formatDateAgo } from "@/utils/format";
import {
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Send,
  Smile,
} from "lucide-react";
import { useState } from "react";
const PostCard = ({ post, className, innerRef }) => {
  const [isLiked, setIsLiked] = useState(post?.liked || false);
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
    <div
      className={cn("bg-white border border-gray-200 rounded-lg", className)}
      ref={innerRef}
    >
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <Avatar className="w-8 h-8">
            <AvatarImage
              src={post?.user?.avatarUrl}
              alt={post?.user?.username}
            />
            <AvatarFallback>
              {post?.user?.username[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="font-semibold text-sm">
            {post?.user?.firstName} {post?.user?.lastName}
          </span>
          <span className=" text-sm mr-2 text-gray-400 italic">
            @{post?.user?.username}
          </span>
        </div>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>

      {/* Post Actions */}
      <div className="p-4">
        <div className="mb-2">
          <span className="text-sm">{post?.content}</span>
        </div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLike}
              className="p-0"
            >
              <Heart
                className={cn(
                  "w-6 h-6",
                  isLiked && "fill-red-500 text-red-500"
                )}
              />
            </Button>
            <Button variant="ghost" size="icon" className="p-0">
              <MessageCircle className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Likes */}
        <div className="mb-2">
          <span className="font-semibold text-sm">{post?.likeCount} likes</span>
        </div>

        {/* Caption */}

        {/* Comments */}
        {post?.commentCount > 0 && (
          <button className="text-sm text-gray-500 mb-2">
            View all {post?.commentCount} comments
          </button>
        )}

        {/* Time */}
        <div className="text-xs text-gray-500 mb-3">
          {formatDateAgo(post?.createdAt)}
        </div>

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
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-500 font-semibold p-0 h-auto"
            >
              Post
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
