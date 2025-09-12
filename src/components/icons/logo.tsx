
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
      <g transform="translate(12, 12)">
        {/* Pin 1 */}
        <g transform="rotate(0) translate(0, -3.5)">
          <path d="M0,3.5 L0,1.5" />
          <path d="M-0.5, -2 A 1 1 0 0 1 0.5 -2" />
          <path d="M0.5,-2 L1.5,-2 A 1 1 0 0 1 1.5, -4 L-1.5, -4 A 1 1 0 0 1 -1.5, -2 L-0.5,-2" />
        </g>
        {/* Pin 2 */}
        <g transform="rotate(72) translate(0, -3.5)">
          <path d="M0,3.5 L0,1.5" />
          <path d="M-0.5, -2 A 1 1 0 0 1 0.5 -2" />
          <path d="M0.5,-2 L1.5,-2 A 1 1 0 0 1 1.5, -4 L-1.5, -4 A 1 1 0 0 1 -1.5, -2 L-0.5,-2" />
        </g>
        {/* Pin 3 */}
        <g transform="rotate(144) translate(0, -3.5)">
          <path d="M0,3.5 L0,1.5" />
          <path d="M-0.5, -2 A 1 1 0 0 1 0.5 -2" />
          <path d="M0.5,-2 L1.5,-2 A 1 1 0 0 1 1.5, -4 L-1.5, -4 A 1 1 0 0 1 -1.5, -2 L-0.5,-2" />
        </g>
        {/* Pin 4 */}
        <g transform="rotate(216) translate(0, -3.5)">
          <path d="M0,3.5 L0,1.5" />
          <path d="M-0.5, -2 A 1 1 0 0 1 0.5 -2" />
          <path d="M0.5,-2 L1.5,-2 A 1 1 0 0 1 1.5, -4 L-1.5, -4 A 1 1 0 0 1 -1.5, -2 L-0.5,-2" />
        </g>
        {/* Pin 5 */}
        <g transform="rotate(288) translate(0, -3.5)">
          <path d="M0,3.5 L0,1.5" />
          <path d="M-0.5, -2 A 1 1 0 0 1 0.5 -2" />
          <path d="M0.5,-2 L1.5,-2 A 1 1 0 0 1 1.5, -4 L-1.5, -4 A 1 1 0 0 1 -1.5, -2 L-0.5,-2" />
        </g>
      </g>
    </svg>
  );
}
