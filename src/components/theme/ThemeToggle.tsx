
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun } from "lucide-react";
import React from "react";

interface ThemeToggleProps {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

const ThemeToggle = ({ 
  variant = "outline", 
  size = "icon",
  className 
}: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button 
      variant={variant} 
      size={size} 
      onClick={toggleTheme} 
      className={className}
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      )}
    </Button>
  );
};

export default ThemeToggle;
