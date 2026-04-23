import { NavLink } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut } from "lucide-react";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? "underline decoration-red-500 decoration-2 underline-offset-8"
    : "";

const AppNavbar = () => {
  return (
    <nav className="p-4 px-10 flex items-center justify-between">
      {/* Logo */}
      <h1 className="text-2xl font-bold">
        <span className="text-white">Stream</span>
        <span className="text-red-500">Chat</span>
      </h1>

      {/* Nav Links */}
      <div className="flex gap-6 text-white text-sm font-medium">
        <NavLink className={navLinkClass} to="/browse/home">Home</NavLink>
        <NavLink className={navLinkClass} to="/browse/movies">Movies</NavLink>
        <NavLink className={navLinkClass} to="/browse/series">Series</NavLink>
        <NavLink className={navLinkClass} to="/browse/tv-shows">TV Shows</NavLink>
      </div>

      {/* Profile */}
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-full cursor-pointer outline-none">
          <Avatar className="size-8">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-black text-white border-gray-400 border ring-0" align="end">
          <DropdownMenuGroup>
            <DropdownMenuLabel>John Doe</DropdownMenuLabel>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            {/* <DropdownMenuItem>Billing</DropdownMenuItem> */}
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="bg-gray-400" />
          <DropdownMenuItem>GitHub</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <LogOut className="h-4 w-4" />
            Logout
          </DropdownMenuItem>
          {/* <DropdownMenuItem>Support</DropdownMenuItem> */}
          {/* <DropdownMenuItem disabled>API</DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default AppNavbar;

