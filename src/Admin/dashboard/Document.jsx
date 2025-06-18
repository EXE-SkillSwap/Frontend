import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Paperclip } from "lucide-react";
import { useRef, useState } from "react";

export default function UploadDocument() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });

  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleFileUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Kích hoạt input file
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("File selected:", file);
      // Bạn có thể upload file lên server hoặc xử lý tiếp ở đây
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Form bên phải */}
      <div className="flex flex-1 justify-center p-8">
        <div className="w-full max-w-2xl">
          <h1 className="text-2xl font-semibold text-gray-900 mb-8">
            Add New Document
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your lesson name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="description"
                  className="text-sm font-medium text-gray-700"
                >
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter your lesson description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full min-h-[40px] resize-none"
                  rows={1}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="price"
                  className="text-sm font-medium text-gray-700"
                >
                  Price
                </Label>
                <Input
                  id="price"
                  name="price"
                  placeholder="Enter your price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>

              <div className="flex justify-end items-end">
                <Button
                  type="submit"
                  className="bg-skillswap-purple hover:bg-skillswap-purple-dark text-white px-8 py-2 rounded-lg font-medium"
                >
                  Add Now
                </Button>
              </div>
            </div>

            <div
              className="mt-8 cursor-pointer"
              onClick={handleFileUploadClick}
            >
              <Card className="border-2 border-dashed border-gray-300 hover:border-skillswap-purple transition-colors">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Paperclip className="w-6 h-6 text-gray-400" />
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    className="text-skillswap-purple hover:text-skillswap-purple-dark font-medium"
                  >
                    Upload Files
                  </button>
                  <p className="text-sm text-gray-500 mt-2">
                    Click to upload or drag and drop
                  </p>
                </CardContent>
              </Card>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
