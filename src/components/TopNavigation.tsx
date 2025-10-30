import { Button } from "@/components/ui/button";
import iconMenu from "@/assets/icon-menu.png";
import iconHeart from "@/assets/icon-heart.png";
import iconSearch from "@/assets/icon-search.png";
import iconMaximize from "@/assets/icon-maximize.png";
import iconMore from "@/assets/icon-more.png";
import iconCustom from "@/assets/icon-custom.png";

interface TopNavigationProps {
  onCustomClick?: () => void;
}

export const TopNavigation = ({ onCustomClick }: TopNavigationProps) => {
  return (
    <nav className="flex items-center justify-between px-[6px] py-2 bg-surface">
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8"
        onClick={onCustomClick}
      >
        <img src={onCustomClick ? iconCustom : iconMenu} alt="Custom" className="w-5 h-5" />
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