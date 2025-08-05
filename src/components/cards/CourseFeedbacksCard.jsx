import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, MessageCircle, Star } from "lucide-react";

const CourseFeedbacksCard = ({
  fetchFeedbacks,
  totalElements,
  totalPages,
  currentPage,
  setCurrentPage,
  loading,
  feedbacks,
}) => {
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchFeedbacks(page);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(0, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className="flex items-center justify-center gap-2 mt-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        {startPage > 0 && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(0)}
            >
              1
            </Button>
            {startPage > 1 && <span className="text-gray-500">...</span>}
          </>
        )}

        {pages.map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="sm"
            onClick={() => handlePageChange(page)}
          >
            {page + 1}
          </Button>
        ))}

        {endPage < totalPages - 1 && (
          <>
            {endPage < totalPages - 2 && (
              <span className="text-gray-500">...</span>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(totalPages - 1)}
            >
              {totalPages}
            </Button>
          </>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    );
  };
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Phản hồi từ học viên ({totalElements})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-16 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : feedbacks.length === 0 ? (
          <div className="text-center py-8">
            <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">
              Chưa có phản hồi nào cho khóa học này.
            </p>
            <p className="text-sm text-gray-400">
              Hãy là người đầu tiên đánh giá!
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {feedbacks.map((feedback, index) => (
                <div
                  key={index}
                  className="border-b border-gray-100 last:border-b-0 pb-6 last:pb-0"
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage
                        src={feedback.user.avatarUrl}
                        alt={`${feedback.user.firstName} ${feedback.user.lastName}`}
                      />
                      <AvatarFallback>
                        {feedback.user.firstName?.[0]}
                        {feedback.user.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900">
                          {feedback.user.firstName} {feedback.user.lastName}
                        </span>
                        <span className="text-sm text-gray-500">
                          @{feedback.user.username}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, starIndex) => (
                          <Star
                            key={starIndex}
                            className={`w-4 h-4 ${
                              starIndex < feedback.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>

                      <p className="text-gray-700 text-sm leading-relaxed">
                        {feedback.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {renderPagination()}

            {/* Page info */}
            {totalElements > 0 && (
              <div className="text-center text-sm text-gray-500 mt-4">
                Hiển thị {currentPage * 10 + 1} -{" "}
                {Math.min((currentPage + 1) * 10, totalElements)} của{" "}
                {totalElements} phản hồi
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CourseFeedbacksCard;
