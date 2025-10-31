import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import iconMenu from "@/assets/icon-menu.png";
import iconHeart from "@/assets/icon-heart.png";
import iconSearch20 from "@/assets/icon-search-20.png";
import iconMaximize from "@/assets/icon-maximize.png";
import iconMore from "@/assets/icon-more.png";
import iconCustom from "@/assets/icon-custom.png";
import iconSearch14 from "@/assets/icon-search-14.png";
import iconMic14 from "@/assets/icon-mic-14.png";
import iconClose14 from "@/assets/icon-close-14.png";

interface TopNavigationProps {
  onCustomClick?: () => void;
  onFavoritesClick?: () => void;
  onSearchChange?: (query: string) => void;
}

export const TopNavigation = ({ onCustomClick, onFavoritesClick, onSearchChange }: TopNavigationProps) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchClick = () => {
    setShowSearch(true);
  };

  const handleCloseSearch = () => {
    setShowSearch(false);
    setSearchQuery("");
    onSearchChange?.("");
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearchChange?.(query);
  };

  if (showSearch) {
    return (
      <nav className="flex items-center gap-2 px-[6px] py-2 bg-surface">
        <div className="flex items-center gap-2 px-2 rounded-lg" style={{ backgroundColor: '#F1F2F5', height: '26px', width: '156px' }}>
          <img src={iconSearch14} alt="Search" className="w-[14px] h-[14px] min-w-[14px] min-h-[14px]" />
          <Input
            type="text"
            placeholder="Search Products..."
            value={searchQuery}
            onChange={handleSearchInput}
            className="flex-1 border-0 bg-transparent h-auto p-0 text-[11px] focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground"
            autoFocus
          />
          <img src={iconMic14} alt="Voice" className="w-[14px] h-[14px] min-w-[14px] min-h-[14px] cursor-pointer" />
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-[26px] w-[26px] p-0"
          onClick={handleCloseSearch}
        >
          <img src={iconClose14} alt="Close" className="w-[10px] h-[10px] min-w-[10px] min-h-[10px]" />
        </Button>
      </nav>
    );
  }

  return (
    <nav className="flex items-center justify-between px-[6px] py-2 bg-surface">
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8"
        onClick={onCustomClick}
      >
        <img src={onCustomClick ? iconCustom : iconMenu} alt="Custom" className="w-5 h-5 min-w-5 min-h-5" />
      </Button>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8"
          onClick={onFavoritesClick}
        >
          <img src={iconHeart} alt="Favorites" className="w-5 h-5 min-w-5 min-h-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8"
          onClick={handleSearchClick}
        >
          <img src={iconSearch20} alt="Search" className="w-5 h-5 min-w-5 min-h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <img src={iconMaximize} alt="Maximize" className="w-5 h-5 min-w-5 min-h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <img src={iconMore} alt="More" className="w-5 h-5 min-w-5 min-h-5" />
        </Button>
      </div>
    </nav>
  );
};