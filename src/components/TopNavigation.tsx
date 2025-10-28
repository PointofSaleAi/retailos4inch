import { Button } from "@/components/ui/button";
import iconMenu from "@/assets/icon-menu.png";
import iconHeart from "@/assets/icon-heart.png";
import iconSearch from "@/assets/icon-search.png";
import iconMaximize from "@/assets/icon-maximize.png";
import iconMore from "@/assets/icon-more.png";

export const TopNavigation = () => {
  return (
    <nav className="flex items-center justify-between px-[6px] py-2 border-b border-border bg-surface">
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <img src={iconMenu} alt="Menu" className="w-5 h-5" />
      </Button>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <img src={iconHeart} alt="Favorites" className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <img src={iconSearch} alt="Search" className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <img src={iconMaximize} alt="Maximize" className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <img src={iconMore} alt="More" className="w-5 h-5" />
        </Button>
      </div>
    </nav>
  );
};