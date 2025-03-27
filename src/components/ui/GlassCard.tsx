
import { cn } from "@/lib/utils";
import React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
  hoverEffect?: boolean;
  glowEffect?: boolean;
}

const GlassCard = ({ 
  className, 
  children, 
  hoverEffect = true,
  glowEffect = false,
  ...props 
}: GlassCardProps) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-md",
        hoverEffect && "transition-all duration-300 hover:shadow-lg hover:border-white/20 hover:scale-[1.01]",
        glowEffect && "before:absolute before:inset-0 before:-z-10 before:bg-gradient-radial before:from-primary/20 before:to-transparent before:opacity-0 before:blur-xl before:transition-opacity hover:before:opacity-100",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
