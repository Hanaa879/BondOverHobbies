
import { cn } from "@/lib/utils";

export function Logo({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6 text-primary", className)}
      {...props}
    >
      <title>BondOverHobbies Logo</title>
      <path d="M17.5 19l-3-3" />
      <path d="M6.5 5l3 3" />
      <path d="M12 22a7 7 0 0 0-7-7" />
      <path d="M12 2a7 7 0 0 0 7 7" />
      <path d="m12 8 2 2-2 2-2-2 2-2z" />
    </svg>
  );
}
