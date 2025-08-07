import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createMembershipSchema } from "@/schemas/createMembership.schema";
import {
  createMembership,
  updateMembership,
} from "@/services/api/membershipService";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Banknote,
  Calendar,
  CreditCard,
  FileText,
  Plus,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const UpdateMembershipDialog = ({
  open,
  onOpenChange,
  membership,
  onRefresh,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createMembershipForm = useForm({
    resolver: zodResolver(createMembershipSchema),
    defaultValues: {
      name: membership?.name || "",
      price: membership?.price || 0,
      duration: membership?.duration || 1,
      description: membership?.description || "",
      features: membership?.features || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const response = await updateMembership(membership?.id, data);
      if (response) {
        toast.success("Cập nhật gói thành viên thành công!");
        onRefresh();
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Error creating membership:", error);
      toast.error("Có lỗi xảy ra khi tạo gói thành viên. Vui lòng thử lại!");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <CreditCard className="w-5 h-5 text-purple-600" />
            </div>
            <DialogTitle className="text-xl font-semibold">
              Cập nhật gói thành viên
            </DialogTitle>
          </div>
          <DialogDescription className="text-gray-600">
            Cập nhật thông tin gói thành viên{" "}
            <strong className="text-gray-900">"{membership.name}"</strong>.
          </DialogDescription>
        </DialogHeader>

        <Form {...createMembershipForm}>
          <form
            onSubmit={createMembershipForm.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="space-y-4">
              {/* Tên gói */}
              <FormField
                control={createMembershipForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm font-medium">
                      <Sparkles className="w-4 h-4" />
                      Tên gói thành viên *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ví dụ: Gói Premium, Gói VIP..."
                        className="h-11"
                        {...field}
                        value={membership.name}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Giá và thời lượng */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={createMembershipForm.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-sm font-medium">
                        <Banknote className="w-4 h-4" />
                        Giá (VND) *
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="number"
                            placeholder="299000"
                            className="h-11 pr-12"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e.target.valueAsNumber);
                            }}
                            value={membership.price}
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                            VND
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={createMembershipForm.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-sm font-medium">
                        <Calendar className="w-4 h-4" />
                        Thời lượng *
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="number"
                            placeholder="30"
                            className="h-11 pr-12"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e.target.valueAsNumber);
                            }}
                            value={membership.duration}
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                            ngày
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Mô tả */}
              <FormField
                control={createMembershipForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm font-medium">
                      <FileText className="w-4 h-4" />
                      Mô tả gói thành viên *
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Mô tả chi tiết về gói thành viên, các quyền lợi và ưu đãi đặc biệt..."
                        className="min-h-[80px] resize-none"
                        {...field}
                        value={membership.description}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tính năng */}
              <FormField
                control={createMembershipForm.control}
                name="features"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm font-medium">
                      <Sparkles className="w-4 h-4" />
                      Tính năng và quyền lợi *
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ví dụ: Truy cập không giới hạn các khóa học. Hỗ trợ 24/7. Chứng chỉ hoàn thành khóa học"
                        className="min-h-[100px] resize-none"
                        {...field}
                        value={membership.features}
                      />
                    </FormControl>
                    <div className="text-xs text-gray-500 mt-1">
                      💡 Mỗi tính năng viết trên một dòng riêng hoặc cách nhau
                      bằng dấu chấm (.)
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="gap-2 pt-6 border-t">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  Hủy bỏ
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="flex-1 bg-purple-600 hover:bg-purple-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Đang cập nhật...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Cập nhật gói thành viên
                  </div>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateMembershipDialog;
