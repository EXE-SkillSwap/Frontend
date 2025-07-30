import { Avatar, AvatarFallback, AvatarImage } from "@/components/nurui/avatar";

import {
  Story,
  StoryControls,
  StoryOverlay,
  StoryProgress,
  StorySlide,
} from "@/components/nurui/story";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/nurui/story-dialog";

const StoryDialog = ({ open, setOpen, images, user }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="aspect-[12/16] w-auto h-[90vh] overflow-hidden p-0 rounded-md">
        <DialogTitle className="sr-only">Story</DialogTitle>

        <Story
          className="relative size-full "
          duration={5000}
          mediaLength={images?.length}
        >
          <DialogHeader className="px-4 py-6">
            <div className="relative z-10 flex items-center gap-2">
              <Avatar className="size-10">
                <AvatarImage src={user?.avatarUrl} alt="@skillsswap" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>

              <StoryProgress
                className="flex-1"
                progressWrapClass="h-1.5"
                progressActiveClass="bg-pink-500"
              />
              <StoryControls
                variant="ghost"
                className="text-white rounded-full"
              />
            </div>
          </DialogHeader>
          {images?.map((story, idx) => (
            <StorySlide
              key={idx}
              index={idx}
              className="absolute inset-0 size-full"
            >
              <img
                src={story.imageUrl}
                className="w-full h-auto max-h-auto"
                alt={story.publicId}
              />

              <div className="absolute bottom-4 left-4  z-10 space-y-1 text-white p-4">
                <a className="text-secondary">
                  {user?.firstName} {user?.lastName}
                </a>
              </div>
            </StorySlide>
          ))}
          <StoryOverlay />
        </Story>
      </DialogContent>
    </Dialog>
  );
};

export default StoryDialog;
