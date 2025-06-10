import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BellIcon } from "lucide-react";
import { useState } from "react";

const NotificationSheet = () => {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          className="relative rounded-full bg-[#6246ea] text-[#fffffe] hover:bg-[#d1d1e9] hover:text-[#6246ea] focus:ring-2 focus:ring-white focus:ring-offset- hover:cursor-pointer transition-all duration-100 ease-in-out"
        >
          <BellIcon aria-hidden="true" className="size-6" />
        </Button>
      </SheetTrigger>
      {open && (
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Thông Báo</SheetTitle>
          </SheetHeader>
          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <h1>Comming soon</h1>
          </div>
        </SheetContent>
      )}
    </Sheet>
  );
};

export default NotificationSheet;
