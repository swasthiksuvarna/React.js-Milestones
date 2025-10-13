import { FC } from "react";
import {
  Search,
  MessageSquare,
  Bell,
  HelpCircle,
  User,
} from "lucide-react";

const TopBar: FC = () => {
  return (
    <div className="w-full h-[56px] flex items-center justify-between bg-white border-b-2 border-sidePanelBorderColor px-10 py-2 ">
      {/* Search Input */}
      <div className="flex items-center space-x-4 w-full max-w-sm">
        <Search className="text-gray-400" size={16} />
        <input
          type="text"
          placeholder="Search..."
          className="w-full outline-none bg-transparent placeholder-gray-400 text-[14px]"
        />
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center space-x-6 text-gray-500 text-[14px]">
        <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-700">
          <MessageSquare size={20} />
          <span>Feedback?</span>
        </div>
        <Bell className="cursor-pointer hover:text-gray-700" size={20} />
        <HelpCircle className="cursor-pointer hover:text-gray-700" size={20} />
        <User className="cursor-pointer hover:text-gray-700" size={20} />
      </div>
    </div>
  );
};

export default TopBar;
