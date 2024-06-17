"use client";
import { BookHeart, Home, Settings2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface INavbarItem {
  id: number;
  title: string;
  url: string;
  icon: React.ReactNode;
}

const NavbarList: INavbarItem[] = [
  {
    id: 1,
    title: "Home",
    url: "/",
    icon: <Home />,
  },
  {
    id: 2,
    title: "My Profile",
    url: "/profile",
    icon: <BookHeart />,
  },
  {
    id: 3,
    title: "Settings",
    url: "/settings",
    icon: <Settings2 />,
  },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-zinc-950/[0.8] border border-zinc-400 py-2 px-1 rounded-lg">
      {NavbarList.map((item) => (
        <TooltipProvider key={item.id}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className={cn(
                  "p-3 text-zinc-50 rounded-md hover:bg-olivia/[0.1] transition-colors duration-300 ease-in-out",
                  pathname === item.url &&
                    "bg-olivia text-zinc-950 hover:bg-olivia hover:text-zinc-950 mx-1"
                )}
              >
                <Link href={item.url}>{item.icon}</Link>
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{item.title}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </nav>
  );
};

export default Navbar;
