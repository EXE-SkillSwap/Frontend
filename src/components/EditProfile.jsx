import { getAllProvinces, updateProfile } from "@/api/services/userService";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { genders } from "@/data/gender";
import { professions } from "@/data/profession";
import { universities } from "@/data/universities";
import { cn } from "@/lib/utils";
import { updateProfileSchema } from "@/schemas/updateProfile.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, Edit2Icon, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const EditProfile = ({ userInfo, onRefresh }) => {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [isEditLocation, setIsEditLocation] = useState(false);

  const profileForm = useForm({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      firstName: userInfo?.firstName || "",
      lastName: userInfo?.lastName || "",
      phoneNumber: userInfo?.phoneNumber || "",
      location: userInfo?.location || "",
      bio: userInfo?.bio || "",
      gender: userInfo?.gender || "",
      birthday: userInfo?.birthday || "",
      profession: userInfo?.profession || "",
      education: userInfo?.education || "",
    },
  });

  useEffect(() => {
    if (!isOpen) return;
    const fetchProvinces = async () => {
      try {
        const response = await getAllProvinces();
        setProvinces(response.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProvinces();
  }, [isOpen]);

  const onSubmit = async (data) => {
    try {
      const response = await updateProfile(data);
      if (response) {
        toast.success("Cập nhật hồ sơ thành công!");
        onRefresh(); // Call the refresh function passed as a prop
      }
      handleClose();
    } catch (error) {
      console.error("Lỗi khi cập nhật hồ sơ:", error);
      toast.error("Không thể cập nhật hồ sơ. Vui lòng thử lại.");
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsEditLocation(false);
    profileForm.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full bg-gray-400 cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <Edit2Icon className="h-4 w-4 mr-2" />
          Chỉnh sửa hồ sơ
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[100vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa hồ sơ</DialogTitle>
          <DialogDescription>
            Cập nhật thông tin hồ sơ của bạn bên dưới.
          </DialogDescription>
        </DialogHeader>

        <Form {...profileForm}>
          <form
            onSubmit={profileForm.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={profileForm.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập tên" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={profileForm.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Họ</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập họ" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={profileForm.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số điện thoại</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập số điện thoại" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {!isEditLocation && (
              <FormField
                control={profileForm.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Địa chỉ</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Nhập địa chỉ của bạn"
                          {...field}
                          readOnly
                          className="mt-1 transition-all duration-200"
                        />
                        <button
                          type="button"
                          tabIndex={-1}
                          className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                          onClick={() => setIsEditLocation(true)}
                        >
                          {isEditLocation ? (
                            <Edit2Icon className="text-gray-300 text-md" />
                          ) : (
                            <Edit2Icon className="text-gray-300 text-md" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {isEditLocation && (
              <FormField
                control={profileForm.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chọn tỉnh thành</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                      value={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Chọn tỉnh thành" />
                      </SelectTrigger>
                      <SelectContent>
                        {provinces.map((province) => (
                          <SelectItem key={province.id} value={province.name}>
                            {province.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={profileForm.control}
              name="education"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chọn trường học</FormLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                      >
                        {field.value
                          ? universities.name.find(
                              (name) => name === field.value
                            )
                          : "Chọn trường học"}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput
                          placeholder="Chọn trường học"
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>Không tìm thấy</CommandEmpty>
                          <CommandGroup>
                            {universities.name.map((uni, index) => (
                              <CommandItem
                                key={index}
                                value={uni}
                                onSelect={(currentValue) => {
                                  field.onChange(
                                    currentValue === field.value
                                      ? ""
                                      : currentValue
                                  );
                                  setOpen(false);
                                }}
                              >
                                {uni}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    field.value === uni
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={profileForm.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giới tính</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                      value={field.value || userInfo?.gender || ""}
                    >
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Giới tính" />
                      </SelectTrigger>
                      <SelectContent>
                        {genders.map((gender) => (
                          <SelectItem key={gender.id} value={gender.name}>
                            {gender.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={profileForm.control}
                name="profession"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Công việc hiện tại</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                      value={field.value || userInfo?.profession || ""}
                    >
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Công việc hiện tại" />
                      </SelectTrigger>
                      <SelectContent>
                        {professions.map((profession) => (
                          <SelectItem
                            key={profession.id}
                            value={profession.name}
                          >
                            {profession.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={profileForm.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giới thiệu</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Giới thiệu về bản thân"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Mô tả ngắn gọn về bản thân (tối đa 500 ký tự)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <DialogTrigger asChild>
                <Button type="button" variant="outline" onClick={handleClose}>
                  Hủy
                </Button>
              </DialogTrigger>
              <Button
                type="submit"
                disabled={
                  profileForm.formState.isSubmitting ||
                  !profileForm.formState.isDirty
                }
              >
                {profileForm.formState.isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Lưu thay đổi
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
