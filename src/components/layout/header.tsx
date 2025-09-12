import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Sprout } from "lucide-react";

export function Header() {
  const navLinks = [
    { href: "#", label: "Hobbies" },
    { href: "#", label: "Events" },
    { href: "#", label: "Showcase" },
    { href: "#", label: "Discover" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Sprout className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block font-headline">
              BondOverHobbies
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
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
                  <Sprout className="h-6 w-6 text-primary" />
                  <span className="font-bold font-headline">BondOverHobbies</span>
                </Link>
                <div className="flex flex-col space-y-3 pt-6">
                  {navLinks.map((link) => (
                    <Link key={link.href + link.label} href={link.href} className="text-foreground">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <nav className="hidden md:flex items-center gap-2">
            <Button variant="ghost" asChild>
                <Link href="#">Sign In</Link>
            </Button>
            <Button asChild>
                <Link href="#">Sign Up</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
