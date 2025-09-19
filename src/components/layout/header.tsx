
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { UserNav } from "./user-nav";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Logo } from "../icons/logo";
import { useAuth } from "@/hooks/use-auth";

export function Header() {
  const pathname = usePathname();
  const { user } = useAuth();
  
  // Consider user signed in if user object exists, not just based on path
  const isSignedIn = !!user;

  const hobbyCategories = [
      "Creative Arts & Crafts",
      "Sports & Fitness",
      "Gaming",
      "Technology & Coding",
      "Music & Performing Arts",
      "Food & Drink",
      "Outdoor & Adventure",
      "Collecting",
  ];

  const navLinks = [
    { href: "/events", label: "Events" },
    { href: "/showcase", label: "Showcase" },
    { href: "/discover", label: "Discover" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
            <span className="hidden font-bold sm:inline-block font-headline">
              BondOverHobbies
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 font-semibold transition-colors hover:text-foreground text-foreground outline-none">
                Hobbies <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {hobbyCategories.map((category) => (
                    <DropdownMenuItem key={category} asChild>
                        <Link href={`/hobbies/${category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}>{category}</Link>
                    </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-semibold transition-colors hover:text-foreground text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Search bar can go here */}
          </div>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                  <Logo />
                  <span className="font-bold font-headline">BondOverHobbies</span>
                </Link>
                <div className="flex flex-col space-y-3 pt-6">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="hobbies">
                            <AccordionTrigger className="hover:no-underline text-foreground">Hobbies</AccordionTrigger>
                            <AccordionContent>
                                <div className="flex flex-col space-y-3 pl-4">
                                {hobbyCategories.map((category) => (
                                    <Link key={category} href={`/hobbies/${category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} className="text-foreground/80">{category}</Link>
                                ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="text-foreground pl-4">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
          {isSignedIn ? (
            <UserNav />
          ) : (
            <nav className="hidden md:flex items-center gap-2">
              <Button variant="ghost" asChild>
                  <Link href="/signin">Sign In</Link>
              </Button>
              <Button asChild>
                  <Link href="/signup">Sign Up</Link>
              </Button>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
