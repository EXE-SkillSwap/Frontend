import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search"
            className="pl-10 bg-gray-50 border-gray-200"
          />
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900">
              SkillSwap Admin
            </div>
            <Badge variant="secondary" className="text-xs">
              Admin
            </Badge>
          </div>
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg" alt="Admin Avatar" />
            <AvatarFallback className="bg-purple-100 text-purple-600">
              SA
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
