import newLogo from "@/assets/newLogo.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="relative max-w-md w-full"></div>

        {/* User Profile */}
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900">
              SkillSwap Admin
            </div>
            <Badge className="text-xs border border-green-500 bg-green-200 text-green-700">
              Admin
            </Badge>
          </div>
          <Avatar className="h-10 w-10">
            <AvatarImage src={newLogo} alt="Admin Avatar" />
            <AvatarFallback className="bg-purple-100 text-purple-600">
              SA
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
