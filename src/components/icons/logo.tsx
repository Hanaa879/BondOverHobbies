
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
      <path d="M12 2l2.94 6.06L22 9.27l-5 4.87 1.18 6.86L12 17.67l-6.18 3.33L7 14.14l-5-4.87 7.06-1.21L12 2z" />
      <path d="M17.5 19l-3-3" />
      <path d="M6.5 5l3 3" />
    </svg>
  );
}
