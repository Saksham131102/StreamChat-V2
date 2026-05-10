import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Menu, X, Home, Film, Tv, MonitorPlay } from "lucide-react";
import { useAuthContext } from "@/contexts/authContext";
import { useLogout } from "@/hooks/auth/useLogout";

const navLinks = [
  { to: "/browse/home",     label: "Home",     Icon: Home },
  { to: "/browse/movies",   label: "Movies",   Icon: Film },
  { to: "/browse/series",   label: "Series",   Icon: MonitorPlay },
  { to: "/browse/tv-shows", label: "TV Shows", Icon: Tv },
];

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? "underline decoration-red-500 decoration-2 underline-offset-8"
    : "";

const AppNavbar = () => {
  const { authUser } = useAuthContext();
  const { logout, isLoading } = useLogout();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <nav className="p-4 px-6 md:px-10 flex items-center justify-between relative z-50">
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          <span className="text-white">Stream</span>
          <span className="text-red-500">Chat</span>
        </h1>

        {/* Desktop Nav Links — hidden below md */}
        <div className="hidden md:flex gap-6 text-white text-sm font-medium">
          {navLinks.map(({ to, label }) => (
            <NavLink key={to} className={navLinkClass} to={to}>
              {label}
            </NavLink>
          ))}
        </div>

        {/* Desktop Profile — hidden below md */}
        <div className="hidden md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full cursor-pointer outline-none">
              <Avatar className="size-8">
                <AvatarImage src={authUser?.profilePic} />
                <AvatarFallback>{authUser?.username?.[0]?.toUpperCase()}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black text-white border-gray-400 border ring-0" align="end">
              <DropdownMenuGroup>
                <DropdownMenuLabel>{authUser?.username}</DropdownMenuLabel>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="bg-gray-400" />
              <DropdownMenuItem>GitHub</DropdownMenuItem>
              <DropdownMenuItem onClick={logout} disabled={isLoading} className="cursor-pointer">
                <LogOut className="h-4 w-4" />
                {isLoading ? "Logging out..." : "Logout"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Hamburger — visible below md */}
        <button
          className="flex md:hidden text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </nav>

      {/* Mobile Drawer Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Mobile Drawer Panel */}
      <div
        className={[
          "fixed top-0 right-0 z-50 h-full w-72 bg-[#0d0d0d] border-l border-white/10 flex flex-col",
          "transition-transform duration-300 ease-in-out md:hidden",
          drawerOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h2 className="text-lg font-bold">
            <span className="text-white">Stream</span>
            <span className="text-red-500">Chat</span>
          </h2>
          <button
            onClick={() => setDrawerOpen(false)}
            className="text-white/60 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
          <Avatar className="size-10">
            <AvatarImage src={authUser?.profilePic} />
            <AvatarFallback>{authUser?.username?.[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm text-white">{authUser?.username}</p>
            <p className="text-xs text-white/40">Member</p>
          </div>
        </div>

        {/* Nav Links */}
        <div className="flex flex-col gap-1 p-4 border-b border-white/10">
          <p className="text-[10px] uppercase tracking-widest text-white/30 px-3 pb-2 font-medium">
            Navigation
          </p>
          {navLinks.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setDrawerOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-red-600/15 text-red-400"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </div>

        {/* Account Links */}
        <div className="flex flex-col gap-1 p-4">
          <p className="text-[10px] uppercase tracking-widest text-white/30 px-3 pb-2 font-medium">
            Account
          </p>
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white transition-colors text-left cursor-pointer w-full">
            Profile
          </button>
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white transition-colors text-left cursor-pointer w-full">
            Settings
          </button>
          <button
            onClick={() => { logout(); setDrawerOpen(false); }}
            disabled={isLoading}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors text-left cursor-pointer w-full disabled:opacity-50"
          >
            <LogOut className="h-4 w-4" />
            {isLoading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </>
  );
};

export default AppNavbar;
