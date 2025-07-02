import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const CustomTooltip = ({
  children,
  content,
  side = "top",
  align = "center",
  className,
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        side={side}
        align={align}
        className={cn(
          "text-white border-none px-3 py-1.5 rounded-md shadow-lg",
          className
        )}
      >
        {content}
      </TooltipContent>
    </Tooltip>
  );
};

export default CustomTooltip;
