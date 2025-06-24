import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Bell } from "lucide-react";
import { useState } from "react";

const NotificationSheet = () => {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div className="relative">
          <Button
            onClick={() => setOpen(true)}
            variant="ghost"
            size="icon"
            className="relative w-10 h-10 rounded-full hover:bg-gray-100/50 transition-all duration-300 group"
          >
            <Bell className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transition-colors" />
            <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 bg-gradient-to-r from-red-500 to-pink-500 border-2 border-white text-xs" />
          </Button>
        </div>
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
