import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { uploadImage } from "@/services/api/cloudinaryService";
import { uploadProfileImage } from "@/services/api/userService";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  ImageIcon,
  Loader2,
  Upload,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

const cloudinary_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

// Constants
const MAX_IMAGES = 5;
const MIN_SWIPE_DISTANCE = 50;
const SUPPORTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Custom hook for touch gestures
const useSwipeGesture = (onSwipeLeft, onSwipeRight) => {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const onTouchStart = useCallback((e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const onTouchMove = useCallback((e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > MIN_SWIPE_DISTANCE;
    const isRightSwipe = distance < -MIN_SWIPE_DISTANCE;

    if (isLeftSwipe) {
      onSwipeLeft?.();
    } else if (isRightSwipe) {
      onSwipeRight?.();
    }
  }, [touchStart, touchEnd, onSwipeLeft, onSwipeRight]);

  return { onTouchStart, onTouchMove, onTouchEnd };
};

// Utility function to validate file
const validateFile = (file) => {
  const errors = [];

  if (!SUPPORTED_IMAGE_TYPES.includes(file.type)) {
    errors.push(`File type ${file.type} not supported`);
  }

  if (file.size > MAX_FILE_SIZE) {
    errors.push(
      `File size too large. Maximum ${MAX_FILE_SIZE / 1024 / 1024}MB allowed`
    );
  }

  return errors;
};

const UploadProfileImage = () => {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [errors, setErrors] = useState([]);
  const [uploadStatus, setUploadStatus] = useState({});
  const fileInputRef = useRef(null);

  // Memoized calculations
  const remainingSlots = useMemo(
    () => MAX_IMAGES - images.length,
    [images.length]
  );
  const canAddMoreImages = remainingSlots > 0;
  const hasImages = images.length > 0;
  const isMaxImagesReached = images.length >= MAX_IMAGES;

  // Navigation functions
  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Swipe gesture hook
  const swipeHandlers = useSwipeGesture(
    () => hasImages && images.length > 1 && nextImage(),
    () => hasImages && images.length > 1 && prevImage()
  );

  const handleFileSelect = useCallback(
    (files) => {
      if (!files || !canAddMoreImages) return;

      const newImages = [];
      const fileErrors = [];

      for (let i = 0; i < Math.min(files.length, remainingSlots); i++) {
        const file = files[i];
        const validationErrors = validateFile(file);

        if (validationErrors.length > 0) {
          fileErrors.push(`${file.name}: ${validationErrors.join(", ")}`);
          continue;
        }

        try {
          const preview = URL.createObjectURL(file);
          const imageId = `${Date.now()}-${Math.random()
            .toString(36)
            .substr(2, 9)}`;
          newImages.push({
            file,
            preview,
            id: imageId,
          });

          // Initialize upload status
          setUploadStatus((prev) => ({
            ...prev,
            [imageId]: { status: "pending", progress: 0 },
          }));
        } catch (error) {
          fileErrors.push(`${file.name}: Failed to create preview`);
        }
      }

      if (fileErrors.length > 0) {
        setErrors(fileErrors);
        setTimeout(() => setErrors([]), 5000);
      }

      if (newImages.length > 0) {
        setImages((prev) => [...prev, ...newImages]);
      }
    },
    [canAddMoreImages, remainingSlots]
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragOver(false);
      handleFileSelect(e.dataTransfer.files);
    },
    [handleFileSelect]
  );

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const removeImage = useCallback(
    (id) => {
      setImages((prev) => {
        const imageToRemove = prev.find((img) => img.id === id);
        const updated = prev.filter((img) => img.id !== id);

        if (imageToRemove) {
          URL.revokeObjectURL(imageToRemove.preview);
        }

        return updated;
      });

      // Remove upload status
      setUploadStatus((prev) => {
        const newStatus = { ...prev };
        delete newStatus[id];
        return newStatus;
      });

      // Reset preview index if current image is removed or out of bounds
      setCurrentImageIndex((currentIndex) => {
        const newLength = images.length - 1;
        if (newLength === 0) return 0;
        return currentIndex >= newLength ? newLength - 1 : currentIndex;
      });
    },
    [images.length]
  );

  // Fixed upload function with proper async handling
  const handleUpload = useCallback(async () => {
    if (!hasImages) return;

    setUploading(true);
    setErrors([]);
    setUploadProgress(0);

    const uploadedImages = [];
    const uploadErrors = [];

    try {
      // Sequential upload with progress tracking
      for (let i = 0; i < images.length; i++) {
        const img = images[i];

        // Update individual image status
        setUploadStatus((prev) => ({
          ...prev,
          [img.id]: { status: "uploading", progress: 0 },
        }));

        try {
          const formData = new FormData();
          formData.append("file", img.file);
          formData.append("upload_preset", "demo-upload-unsigned");
          formData.append("cloud_name", cloudinary_name);

          const response = await uploadImage(formData);

          if (response.data?.secure_url) {
            uploadedImages.push({
              imageUrl: response.data.secure_url,
              publicId: response.data.public_id,
            });

            // Update success status
            setUploadStatus((prev) => ({
              ...prev,
              [img.id]: { status: "success", progress: 100 },
            }));
          } else {
            throw new Error("No secure URL returned");
          }
        } catch (error) {
          console.error(`Failed to upload ${img.file.name}:`, error);
          uploadErrors.push(`${img.file.name}: ${error.message}`);

          // Update error status
          setUploadStatus((prev) => ({
            ...prev,
            [img.id]: { status: "error", progress: 0 },
          }));
        }

        // Update overall progress
        setUploadProgress(Math.round(((i + 1) / images.length) * 100));
      }

      // Save to backend if we have successful uploads
      if (uploadedImages.length > 0) {
        try {
          const response = await uploadProfileImage(uploadedImages);

          if (response) {
            toast.success(
              `Hoàn tất tải lên ${uploadedImages.length} ảnh vào hồ sơ!`
            );
            setOpen(false); // Close dialog on success
          } else {
            throw new Error(response.message || "Không thể lưu vào hồ sơ");
          }
        } catch (error) {
          console.error("Failed to save to backend:", error);
          setErrors((prev) => [...prev, " Không thể lưu ảnh vào hồ sơ"]);
        }
      }

      // Show upload errors if any
      if (uploadErrors.length > 0) {
        setErrors(uploadErrors);
      }

      // Show summary
      if (uploadedImages.length > 0 && uploadErrors.length > 0) {
        toast.info(
          `${uploadedImages.length} ảnh đã tải lên, ${uploadErrors.length} ảnh thất bại`
        );
      } else if (uploadErrors.length === images.length) {
        toast.error("Tất cả các lần tải lên đều thất bại");
      }
    } catch (error) {
      console.error("Upload process failed:", error);
      setErrors(["Quá trình tải lên thất bại. Vui lòng thử lại."]);
      toast.error("Quá trình tải lên thất bại");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  }, [hasImages, images, cloudinary_name]);

  const handleOpenChange = useCallback(
    (newOpen) => {
      setOpen(newOpen);
      if (!newOpen) {
        // Clean up all image URLs when closing dialog
        images.forEach((img) => {
          if (img.preview) {
            URL.revokeObjectURL(img.preview);
          }
        });
        setImages([]);
        setPreviewOpen(false);
        setErrors([]);
        setCurrentImageIndex(0);
        setUploadProgress(0);
        setUploadStatus({});
      }
    },
    [images]
  );

  const openPreview = useCallback((index) => {
    setCurrentImageIndex(index);
    setPreviewOpen(true);
  }, []);

  // Keyboard navigation effect
  useEffect(() => {
    if (!previewOpen) return;

    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          prevImage();
          break;
        case "ArrowRight":
          e.preventDefault();
          nextImage();
          break;
        case "Escape":
          e.preventDefault();
          setPreviewOpen(false);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [previewOpen, prevImage, nextImage]);

  // Cleanup effect for component unmount
  useEffect(() => {
    return () => {
      images.forEach((img) => {
        if (img.preview) {
          URL.revokeObjectURL(img.preview);
        }
      });
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full cursor-pointer">
            <Upload className="h-4 w-4 mr-2" />
            Ảnh cá nhân
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Tải ảnh cá nhân
            </DialogTitle>
            <DialogDescription>
              Chọn tối đa {MAX_IMAGES} ảnh để tải lên. Kéo và thả hoặc nhấp để
              chọn ảnh. Định dạng được hỗ trợ: JPEG, PNG, GIF, WebP. Kích thước
              tối đa: {MAX_FILE_SIZE / 1024 / 1024}MB.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Error Display */}
            {errors.length > 0 && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md border border-destructive/20">
                <ul className="list-disc list-inside space-y-1">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Upload Progress */}
            {uploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Đang tải lên...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}

            {/* Upload Area */}
            <div
              className={cn(
                "border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 cursor-pointer",
                isDragOver
                  ? "border-primary bg-primary/5 scale-105"
                  : "border-muted-foreground/25 hover:border-muted-foreground/50",
                isMaxImagesReached && "opacity-50 pointer-events-none"
              )}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => canAddMoreImages && fileInputRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && canAddMoreImages) {
                  e.preventDefault();
                  fileInputRef.current?.click();
                }
              }}
              aria-label={`Upload area. ${images.length} of ${MAX_IMAGES} images selected`}
            >
              <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <div className="space-y-2">
                <p className="text-sm font-medium">
                  {isMaxImagesReached
                    ? `Đã đạt tối đa ${MAX_IMAGES} ảnh`
                    : "Thả ảnh vào đây hoặc nhấp để duyệt"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {images.length}/{MAX_IMAGES} ảnh đã chọn
                  {remainingSlots > 0 && ` • Còn lại ${remainingSlots} slot`}
                </p>
              </div>
            </div>

            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleFileSelect(e.target.files)}
            />

            {/* Image Previews */}
            {hasImages && (
              <div className="space-y-3">
                <Label className="text-sm font-medium">Ảnh đã chọn</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {images.map((image, index) => {
                    const status = uploadStatus[image.id];
                    return (
                      <div key={image.id} className="relative group">
                        <div
                          className="aspect-square rounded-lg overflow-hidden bg-muted cursor-pointer transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-primary/20"
                          onClick={() => openPreview(index)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              openPreview(index);
                            }
                          }}
                          aria-label={`Preview image ${index + 1}: ${
                            image.file.name
                          }`}
                        >
                          <img
                            src={image.preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = "/placeholder.svg";
                            }}
                          />

                          {/* Status overlay */}
                          {status && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                              {status.status === "uploading" && (
                                <Loader2 className="h-6 w-6 text-white animate-spin" />
                              )}
                              {status.status === "success" && (
                                <div className="h-6 w-6 bg-green-500 rounded-full flex items-center justify-center">
                                  <span className="text-white text-xs">✓</span>
                                </div>
                              )}
                              {status.status === "error" && (
                                <div className="h-6 w-6 bg-red-500 rounded-full flex items-center justify-center">
                                  <span className="text-white text-xs">✗</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Remove button */}
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImage(image.id);
                          }}
                          disabled={uploading}
                          aria-label={`Remove ${image.file.name}`}
                        >
                          <X className="h-3 w-3" />
                        </Button>

                        {/* Preview button */}
                        <Button
                          variant="secondary"
                          size="icon"
                          className="absolute -top-2 -left-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                          onClick={(e) => {
                            e.stopPropagation();
                            openPreview(index);
                          }}
                          aria-label={`Preview ${image.file.name}`}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>

                        <p
                          className="text-xs text-muted-foreground mt-1 truncate"
                          title={image.file.name}
                        >
                          {image.file.name}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={uploading}
            >
              Hủy
            </Button>
            <Button onClick={handleUpload} disabled={!hasImages || uploading}>
              {uploading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Đang tải lên... {uploadProgress}%</span>
                </div>
              ) : (
                `Tải lên ${images.length} ảnh`
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Image Preview Modal */}
      {previewOpen && hasImages && (
        <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] p-0">
            <div className="relative">
              <img
                src={images[currentImageIndex]?.preview}
                alt={`Preview ${currentImageIndex + 1}`}
                className="w-full h-auto max-h-[80vh] object-contain"
                {...swipeHandlers}
              />

              {/* Navigation arrows */}
              {images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )}

              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {images.length}
              </div>

              {/* Close button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/70"
                onClick={() => setPreviewOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default UploadProfileImage;
