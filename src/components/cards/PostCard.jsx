import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { likePost } from "@/services/api/likeService";
import { formatDateAgo } from "@/utils/format";
import { Heart, MessageCircle, Send } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
const PostCard = ({ post, className, innerRef }) => {
  const [isLiked, setIsLiked] = useState(post?.liked || false);
  const [likesCount, setLikesCount] = useState(post?.likeCount);
  const throttleRef = useRef(false);
  const nav = useNavigate();

  const handleLike = async () => {
    if (throttleRef.current) return;

    throttleRef.current = true;

    try {
      await likePost(post?.id);
      setIsLiked(!isLiked);
      setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    } catch (error) {
      console.error("Error liking post:", error);
      throttleRef.current = false;
      return;
    }

    setTimeout(() => {
      throttleRef.current = false;
    }, 2000);
  };

  const handleViewPostDetail = () => {
    if (window.location.pathname === `/posts/${post?.id}`) return;
    nav(`/posts/${post?.id}`);
  };

  const handleViewPostAuth = (nickname) => {
    nav(`/p/${nickname}`);
  };

  return (
    <div
      className={cn("bg-white border border-gray-200 rounded-lg", className)}
      ref={innerRef}
    >
      {/* Post Header */}
      <div className="flex items-center justify-between p-4 ">
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => handleViewPostAuth(post?.user?.username)}
        >
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
      </div>

      {/* Post Actions */}
      <div className="p-4">
        <div className="mb-2" onClick={handleViewPostDetail}>
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
            <Button
              variant="ghost"
              size="icon"
              className="p-0"
              onClick={handleViewPostDetail}
            >
              <MessageCircle className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Likes */}
        <div className="mb-2">
          <span className="font-semibold text-sm">{likesCount} likes</span>
        </div>

        {/* Caption */}

        {/* Comments */}
        {post?.commentCount > 0 && (
          <button
            className="text-sm text-gray-500 mb-2"
            onClick={handleViewPostDetail}
          >
            Xem tất cả {post?.commentCount} bình luận
          </button>
        )}

        {/* Time */}
        <div className="text-xs text-gray-500 mb-3">
          {formatDateAgo(post?.createdAt)}
        </div>

        {/* Add Comment */}
        <div className="flex items-center space-x-2 pt-2 border-t border-gray-100">
          <Send className="text-gray-500" />
          <Input
            onClick={handleViewPostDetail}
            placeholder="Bình luận..."
            className="flex-1 border-none p-0 h-auto focus-visible:ring-0 text-sm bg-transparent"
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
