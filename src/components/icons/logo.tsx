
import { cn } from "@/lib/utils";

export function Logo({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6 text-primary", className)}
      {...props}
    >
      <title>BondOverHobbies Logo</title>
      <path d="M19.33 6.33a2.5 2.5 0 0 0-3.66-3.66l-12 12a2.5 2.5 0 0 0 3.66 3.66l12-12z" />
      <path d="M13.5 1.5l-4 4" />
      <path d="M19.5 7.5l-4 4" />
      <path d="m4.63 14.2-.07-.07a2.5 2.5 0 1 0-3.46 3.53" />
      <path d="m2.1 18.9 1.4-1.4" />
      <path d="m1.4 17.5 1.4 1.4" />
    </svg>
  );
}
