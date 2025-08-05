import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { sendFeedback } from "@/services/api/feedbackService";
import { MessageCircle, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const SendFeedbackCard = ({ courseId, onRefresh }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmitFeedback = async () => {
    const feedbackData = {
      rating,
      content: feedback,
    };
    try {
      const response = await sendFeedback(courseId, feedbackData);
      if (response) {
        setRating(0);
        setFeedback("");

        onRefresh();
        toast.success("Đánh giá đã được gửi thành công!");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Không thể gửi đánh giá. Vui lòng thử lại sau."
      );
      setRating(0);
      setFeedback("");
    }
  };
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Gửi phản hồi
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Rating Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Đánh giá của bạn
          </label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="p-1 hover:scale-110 transition-transform"
                onClick={() => setRating(star)}
              >
                <Star
                  className={`w-6 h-6 ${
                    star <= rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300 hover:text-yellow-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Feedback Textarea */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nhận xét
          </label>
          <Textarea
            placeholder="Nhập phản hồi của bạn tại đây..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={4}
          />
        </div>

        {/* Submit Button */}
        <Button
          className="w-full"
          onClick={handleSubmitFeedback}
          disabled={!rating || !feedback.trim()}
        >
          Gửi đánh giá
        </Button>
      </CardContent>
    </Card>
  );
};

export default SendFeedbackCard;
