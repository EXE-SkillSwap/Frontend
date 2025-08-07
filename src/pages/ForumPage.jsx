import PostCard from "@/components/cards/PostCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchUserProfile } from "@/redux/slices/profileSlice";
import { createPosts, getAllPosts } from "@/services/api/postsService";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

// Forum Page Component
export default function ForumPage() {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector((state) => state.profile);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (!userInfo) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, userInfo]);

  const fetchPosts = async ({ pageParam }) => {
    const res = await getAllPosts(pageParam);
    return res;
  };

  const { data, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.data?.page?.number;
      const totalPage = lastPage.data?.page?.totalPages;
      if (currentPage < totalPage - 1) {
        return currentPage + 1;
      }
      return undefined;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const mainContent = data?.pages?.map((page) => {
    return page.data?.content?.map((post) => {
      return (
        <PostCard key={post.id} post={post} className={""} innerRef={ref} />
      );
    });
  });

  const handlePostStatus = async () => {
    const data = {
      content: content,
    };
    try {
      const response = await createPosts(data);

      if (response.status === 201) {
        setContent("");
        toast.success("Đăng bài thành công!");
        refetch();
      }
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Đăng bài không thành công. Vui lòng thử lại sau.");
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      <main className="flex-1 max-w-2xl mx-auto px-4 py-6 mt-20">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Main Feed - Expanded to take more space */}
          <div className="xl:col-span-4 space-y-6">
            {/* Up Status */}
            <div className="bg-white/80 border border-purple-100 rounded-lg p-6 shadow-sm mb-2">
              <div className="flex items-start gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={userInfo?.avatarUrl} />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Input
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Bạn đang nghĩ gì? Hãy chia sẻ cảm xúc hoặc trạng thái của bạn..."
                    className="bg-purple-50 border border-purple-200 focus:border-purple-400 focus:ring-purple-200 rounded-full px-6 py-3 text-base"
                  />
                </div>
                <Button
                  onClick={handlePostStatus}
                  className="bg-gradient-to-r from-purple-400 to-indigo-500 text-white rounded-full px-8 py-3 font-semibold shadow-md hover:from-purple-500 hover:to-indigo-600"
                  disabled={!content.trim()}
                >
                  Đăng
                </Button>
              </div>
            </div>
            <div className="space-y-6">{mainContent}</div>
          </div>
        </div>
      </main>
    </div>
  );
}
