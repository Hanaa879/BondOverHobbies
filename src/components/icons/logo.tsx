
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
      className={cn("h-6 w-6 pulsating-glow", className)}
      {...props}
    >
        <title>BondOverHobbies Logo</title>
        <path
            d="M12 20.5C12 22 10.8417 22 10 22C8.15833 22 7 21 7 19C7 17 10 16 12 14"
            stroke="currentColor"
        />
        <path
            d="M12 14C14 12 17 10 17 6C17 2 15 2 12 2C9 2 7 2 7 6"
            stroke="currentColor"
        />
        <path
            d="M10.382,14.7459L12,11.5l1.618,3.2459,3.579.52-2.59,2.524.611,3.5642L12,20.5l-3.218,1.6942.611-3.5642-2.59-2.524,3.579-.52Z"
            stroke="currentColor"
            fill="hsl(var(--primary))"
        />
    </svg>
  );
}
