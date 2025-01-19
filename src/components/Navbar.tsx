import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { AlignJustify, Moon, Mountain, Search, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { setTheme } from "@/store/features/theme/themeSlice";

const navLinks = [
  {
    id: 1,
    title: "Term of service",
    url: "/term-of-service",
  },
  {
    id: 2,
    title: "Privacy policies",
    url: "/privacy-policy",
  },
  {
    id: 3,
    title: "Contact",
    url: "/contact-us",
  },
];

export default function Navbar() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state: RootState) => state.theme.theme);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    dispatch(setTheme(newTheme));
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background dark:border-gray-800">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <Mountain className="h-6 w-6" />
          <span className="sr-only">React-Vite</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              to={link.url}
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              {link.title}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Search className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="sr-only">Search</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[300px] p-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full pl-8"
                />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <Toggle
            aria-label="Toggle dark mode"
            className="rounded-full"
            onClick={toggleTheme}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            )}
          </Toggle>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full md:hidden"
              >
                <AlignJustify className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="md:hidden">
              <div className="grid gap-4 p-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.id}
                    to={link.url}
                    className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
