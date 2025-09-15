import { Menu, Heart, Search, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export const TopNavigation = () => {
  return (
    <nav className="flex items-center justify-between px-4 py-3 border-b border-border bg-surface">
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <Menu size={16} />
      </Button>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Heart size={16} />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Search size={16} />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal size={16} />
        </Button>
      </div>
    </nav>
  );
};