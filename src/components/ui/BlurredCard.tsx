
import { cn } from "@/lib/utils";
import React from "react";

interface BlurredCardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
  hoverEffect?: boolean;
}

const BlurredCard = ({ 
  className, 
  children, 
  hoverEffect = true,
  ...props 
}: BlurredCardProps) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-md",
        hoverEffect && "transition-all duration-300 hover:shadow-lg hover:border-white/20 hover:scale-[1.01]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default BlurredCard;
