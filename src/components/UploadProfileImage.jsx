import { uploadProfileImage } from "@/api/services/userService";
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
import { cn } from "@/lib/utils";
import { ImageIcon, Upload, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

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
  const [previewOpen, setPreviewOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [errors, setErrors] = useState([]);
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
          newImages.push({
            file,
            preview,
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          });
        } catch (error) {
          fileErrors.push(`${file.name}: Failed to create preview`);
        }
      }

      if (fileErrors.length > 0) {
        setErrors(fileErrors);
        // Clear errors after 5 seconds
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
          // Clean up the specific image URL
          URL.revokeObjectURL(imageToRemove.preview);
        }

        return updated;
      });

      // Reset preview index if current image is removed or out of bounds
      setCurrentImageIndex((currentIndex) => {
        const newLength = images.length - 1; // After removal
        if (newLength === 0) return 0;
        return currentIndex >= newLength ? newLength - 1 : currentIndex;
      });
    },
    [images.length]
  );

  const handleUpload = useCallback(async () => {
    if (!hasImages) return;

    setUploading(true);
    setErrors([]);

    try {
      // Simulate API call - replace with actual upload logic
      //   await new Promise((resolve) => setTimeout(resolve, 2000));
      const formData = new FormData();
      // images.forEach((image) => {
      //   formData.append("images", image);
      images.forEach((img) => {
        formData.append("files", img.file);
      });

      const response = await uploadProfileImage(formData);

      if (response) {
        images.forEach((img) => {
          if (img.preview) {
            URL.revokeObjectURL(img.preview);
          }
        });
        setImages([]);
        setOpen(false);
        toast.success(response.data);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      setErrors(["Upload failed. Please try again."]);
    } finally {
      setUploading(false);
    }
  }, [hasImages, images]);

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
      // Only cleanup on component unmount, not on every render
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
            <Upload className="h-4 w-4" />
            Ảnh cá nhân
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Tải ảnh cá nhân</DialogTitle>
            <DialogDescription>
              Chọn tối đa {MAX_IMAGES} ảnh để tải lên. Kéo và thả hoặc nhấp để
              chọn ảnh. Định dạng được hỗ trợ: JPEG, PNG, GIF, WebP. Kích thước
              tối đa: {MAX_FILE_SIZE / 1024 / 1024}MB.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Error Display */}
            {errors.length > 0 && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
                <ul className="list-disc list-inside space-y-1">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Upload Area */}
            <div
              className={cn(
                "border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer",
                isDragOver
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/25",
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
                    ? `Maximum ${MAX_IMAGES} images reached`
                    : "Thả ảnh vào đây hoặc nhấp để duyệt"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {images.length}/{MAX_IMAGES} ảnh đã chọn
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
              <div className="space-y-2">
                <Label className="text-sm font-medium">Chọn ảnh</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {images.map((image, index) => (
                    <div key={image.id} className="relative group">
                      <div
                        className="aspect-square rounded-lg overflow-hidden bg-muted cursor-pointer transition-transform hover:scale-105"
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
                      </div>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(image.id);
                        }}
                        aria-label={`Remove ${image.file.name}`}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                      <p
                        className="text-xs text-muted-foreground mt-1 truncate"
                        title={image.file.name}
                      >
                        {image.file.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpload} disabled={!hasImages || uploading}>
              {uploading
                ? "Đang tải lên..."
                : `Lưu ${images.length} tấm ảnh${
                    images.length !== 1 ? "s" : ""
                  }`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UploadProfileImage;
