"use client";
import { BookHeart, Home, Settings2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip";
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
		icon: <Home/>,
	},
	{
		id: 2,
		title: "My Profile",
		url: "/profile",
		icon: <BookHeart/>,
	},
	{
		id: 3,
		title: "Settings",
		url: "/settings",
		icon: <Settings2/>,
	},
];

const Navbar = () => {
	const pathname = usePathname();

	return (
		<nav
			className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-summer-dog rounded-lg p-0.5">
			<div className="py-2 px-1 flex flex-row bg-zinc-950 rounded-lg">
				{NavbarList.map((item) => (
					<TooltipProvider key={item.id}>
						<Tooltip>
							<TooltipTrigger asChild>
								<Link
									href={item.url}
									className={cn(
										"p-3 text-zinc-50 rounded-md hover:bg-olivia/[0.1] transition-colors duration-300 ease-in-out",
										pathname === item.url &&
										"bg-summer-dog text-zinc-950 hover:bg-olivia hover:text-zinc-950 mx-1"
									)}
								>
									{item.icon}
								</Link>
							</TooltipTrigger>
							<TooltipContent>
								<p>{item.title}</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				))}
			</div>
		</nav>
	);
};

export default Navbar;
