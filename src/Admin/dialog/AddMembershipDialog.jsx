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
import { createMembership } from "@/services/api/membershipService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
export function AddMembershipDialog({ onRefresh }) {
  const [open, setOpen] = useState(false);
  const createMemberhipForm = useForm({
    resolver: zodResolver(createMembershipSchema),
    defaultValues: {
      name: "",
      price: 0,
      duration: 1,
      description: "",
      features: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await createMembership(data);
      if (response.status === 201) {
        toast.success("Tạo gói thành viên thành công");
        onRefresh(); // Call the refresh function passed as a prop
        setOpen(false); // Close the dialog after successful creation
        createMemberhipForm.reset(); // Reset the form
      }
    } catch (error) {
      console.error("Error creating membership:", error);
      toast.error("Lỗi khi tạo gói thành viên");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Form {...createMemberhipForm}>
        <form onSubmit={createMemberhipForm.handleSubmit(onSubmit)}>
          <DialogTrigger asChild>
            <Button
              onClick={() => setOpen(true)}
              className={"bg-gray-600 hover:bg-purple-700"}
            >
              Thêm gói thành viên
            </Button>
          </DialogTrigger>
          {open && (
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Thông tin gói thành viên mới</DialogTitle>
                <DialogDescription>
                  Thêm thông tin gói thành viên mới để người dùng có thể đăng
                  ký.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <FormField
                    control={createMemberhipForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tên gói</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={createMemberhipForm.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Giá</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            value={field.value ?? ""}
                            onChange={(e) =>
                              field.onChange(e.target.valueAsNumber)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={createMemberhipForm.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Thời lượng</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            value={field.value ?? ""}
                            onChange={(e) =>
                              field.onChange(e.target.valueAsNumber)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={createMemberhipForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Miêu tả</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Mô tả gói thành viên"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={createMemberhipForm.control}
                    name="features"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tính năng</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Nhập các tính năng, cách nhau bằng dấu chấm (.)"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Hủy</Button>
                </DialogClose>
                <Button
                  type="submit"
                  className={"bg-purple-600 hover:bg-purple-700"}
                  onClick={createMemberhipForm.handleSubmit(onSubmit)}
                >
                  Lưu
                </Button>
              </DialogFooter>
            </DialogContent>
          )}
        </form>
      </Form>
    </Dialog>
  );
}
