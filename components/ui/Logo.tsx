import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "text-xl",
  md: "text-2xl",
  lg: "text-4xl",
};

export default function Logo({ size = "md", className }: LogoProps) {
  return (
    <span
      className={cn(
        "font-jakarta font-extrabold tracking-tight uppercase",
        sizes[size],
        className,
      )}
    >
      {/* Off-white in dark mode, caramel in light mode */}
      <span className="logo-primary">Raa</span>
      <span style={{ color: "#4E2C20" }}>von</span>
    </span>
  );
}
