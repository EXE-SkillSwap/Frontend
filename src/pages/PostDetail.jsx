import PostCard from "@/components/cards/PostCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { addComment, getCommentsByPostId } from "@/services/api/commentService";
import { getPostById } from "@/services/api/postsService";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { ArrowLeft, MessageCircle, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  // Comment states
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);

  const { postId } = useParams();
  const navigate = useNavigate();

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await getPostById(postId);
      const postData = response.data;
      setPost(postData);
      setIsLiked(postData.liked || false);
      setLikesCount(postData.likeCount || 0);
    } catch (error) {
      console.error("Error fetching post:", error);
      setError("Không thể tải bài viết");
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      setCommentsLoading(true);
      const response = await getCommentsByPostId(postId);
      setComments(response.data || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setCommentsLoading(false);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!commentText.trim() || isSubmittingComment) return;

    setIsSubmittingComment(true);

    try {
      const response = await addComment(post.id, {
        content: commentText.trim(),
      });

      // Add new comment to the list
      setComments((prev) => [response.data, ...prev]);
      setCommentText("");

      // Update comment count in post
      setPost((prev) => ({
        ...prev,
        commentCount: (prev.commentCount || 0) + 1,
      }));
    } catch (error) {
      console.error("Error creating comment:", error);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const formatDate = (dateString) => {
    try {
      return formatDistanceToNow(new Date(dateString), {
        addSuffix: true,
        locale: vi,
      });
    } catch {
      return "Không xác định";
    }
  };

  useEffect(() => {
    if (postId) {
      fetchPost();
      fetchComments();
    }
  }, [postId]);

  const handleGoBack = () => {
    navigate(`/forum`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 mt-16">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="animate-pulse">
              <div className="h-10 bg-gray-200 rounded w-32 mb-6"></div>
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/6"></div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center mt-16">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Có lỗi xảy ra
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={handleGoBack} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>
        </Card>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center mt-16">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Không tìm thấy bài viết
          </h2>
          <p className="text-gray-600 mb-4">
            Bài viết này có thể đã bị xóa hoặc không tồn tại.
          </p>
          <Button onClick={handleGoBack} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={handleGoBack}
            className="mb-6 hover:bg-gray-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>

          <PostCard post={post} />

          {/* Comments Section */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold text-gray-900">
                  Bình luận ({post.commentCount || 0})
                </h2>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Comment Form */}
                <form onSubmit={handleSubmitComment} className="space-y-4">
                  <Textarea
                    placeholder="Viết bình luận của bạn..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="min-h-[100px] resize-none"
                    disabled={isSubmittingComment}
                  />
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={!commentText.trim() || isSubmittingComment}
                      className="px-6"
                    >
                      {isSubmittingComment ? (
                        "Đang gửi..."
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Gửi bình luận
                        </>
                      )}
                    </Button>
                  </div>
                </form>

                <Separator />

                {/* Comments List */}
                <div className="space-y-4">
                  {commentsLoading ? (
                    // Loading skeleton for comments
                    <div className="space-y-4">
                      {[...Array(3)].map((_, index) => (
                        <div key={index} className="animate-pulse">
                          <div className="flex space-x-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                            <div className="flex-1 space-y-2">
                              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                              <div className="h-3 bg-gray-200 rounded w-full"></div>
                              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : comments.length > 0 ? (
                    comments.map((comment) => (
                      <CommentItem key={comment.id} comment={comment} />
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Chưa có bình luận nào.</p>
                      <p className="text-sm">
                        Hãy là người đầu tiên bình luận!
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// Comment Item Component
const CommentItem = ({ comment }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(comment.likesCount || 0);

  const formatDate = (dateString) => {
    try {
      return formatDistanceToNow(new Date(dateString), {
        addSuffix: true,
        locale: vi,
      });
    } catch {
      return "Không xác định";
    }
  };

  const handleLikeComment = () => {
    setIsLiked(!isLiked);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
    // TODO: Call API to like/unlike comment
  };

  return (
    <div className="flex space-x-3 p-4 bg-gray-50 rounded-lg">
      <Avatar className="w-10 h-10 border">
        <AvatarImage
          src={comment.user?.avatarUrl}
          alt={`${comment.user?.firstName} ${comment.user?.lastName}`}
        />
        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm">
          {comment.user?.firstName?.charAt(0)}
          {comment.user?.lastName?.charAt(0)}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900">
            {comment.user?.firstName} {comment.user?.lastName}
          </span>
          <span className="text-sm text-gray-500">
            @{comment.user?.username}
          </span>
          <span className="text-sm text-gray-500">•</span>
          <span className="text-sm text-gray-500">
            {formatDate(comment.createdAt)}
          </span>
        </div>

        <p className="text-gray-700 leading-relaxed">{comment.content}</p>
      </div>
    </div>
  );
};

export default PostDetail;
