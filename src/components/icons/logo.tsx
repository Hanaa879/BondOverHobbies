
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
      <path d="M10.3 21.7a2 2 0 1 1-3.8-1.4l5-8.6a2 2 0 1 1 3.5 2l-4.7 8Z" />
      <path d="M14.2 3.4a2 2 0 1 1 .6 3.8L9.7 12a2 2 0 1 1-3.5-2l5-8.6Z" />
      <path d="m22 7-4.7 8-4.7-8" />
      <path d="m17.3 15-4.7-8" />
    </svg>
  );
}
