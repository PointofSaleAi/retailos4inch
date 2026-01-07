import { useState, useRef, useEffect } from "react";

interface IOSDatePickerProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  onClose: () => void;
  onApply: () => void;
}

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const generateDays = (month: number, year: number): number[] => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => i + 1);
};

const generateYears = (): number[] => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);
};

const ITEM_HEIGHT = 28;
const VISIBLE_ITEMS = 3;

interface WheelColumnProps {
  items: (string | number)[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

const WheelColumn = ({ items, selectedIndex, onSelect }: WheelColumnProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startScrollTop = useRef(0);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = selectedIndex * ITEM_HEIGHT;
    }
  }, [selectedIndex]);

  const handleScroll = () => {
    if (containerRef.current && !isDragging.current) {
      const scrollTop = containerRef.current.scrollTop;
      const newIndex = Math.round(scrollTop / ITEM_HEIGHT);
      if (newIndex !== selectedIndex && newIndex >= 0 && newIndex < items.length) {
        onSelect(newIndex);
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    startY.current = e.touches[0].clientY;
    startScrollTop.current = containerRef.current?.scrollTop || 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const deltaY = startY.current - e.touches[0].clientY;
    containerRef.current.scrollTop = startScrollTop.current + deltaY;
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollTop;
      const newIndex = Math.round(scrollTop / ITEM_HEIGHT);
      const clampedIndex = Math.max(0, Math.min(items.length - 1, newIndex));
      containerRef.current.scrollTo({
        top: clampedIndex * ITEM_HEIGHT,
        behavior: 'smooth'
      });
      if (clampedIndex !== selectedIndex) {
        onSelect(clampedIndex);
      }
    }
  };

  return (
    <div className="relative h-[84px] overflow-hidden">
      {/* Selection highlight */}
      <div 
        className="absolute left-0 right-0 top-1/2 -translate-y-1/2 bg-gray-100/80 rounded-md pointer-events-none z-0"
        style={{ height: ITEM_HEIGHT }}
      />
      
      <div
        ref={containerRef}
        className="h-full overflow-y-auto scrollbar-hide relative z-10"
        style={{ 
          scrollSnapType: 'y mandatory',
          paddingTop: ITEM_HEIGHT,
          paddingBottom: ITEM_HEIGHT
        }}
        onScroll={handleScroll}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {items.map((item, index) => {
          const isSelected = index === selectedIndex;
          return (
            <div
              key={index}
              className={`flex items-center justify-center cursor-pointer transition-all duration-150 ${
                isSelected 
                  ? 'text-foreground font-semibold' 
                  : 'text-muted-foreground/60'
              }`}
              style={{ 
                height: ITEM_HEIGHT,
                scrollSnapAlign: 'center',
                fontSize: isSelected ? '13px' : '11px',
                fontFamily: 'Montserrat, sans-serif'
              }}
              onClick={() => {
                onSelect(index);
                if (containerRef.current) {
                  containerRef.current.scrollTo({
                    top: index * ITEM_HEIGHT,
                    behavior: 'smooth'
                  });
                }
              }}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const IOSDatePicker = ({ selectedDate, onDateChange, onClose, onApply }: IOSDatePickerProps) => {
  const [month, setMonth] = useState(selectedDate.getMonth());
  const [day, setDay] = useState(selectedDate.getDate());
  const [year, setYear] = useState(selectedDate.getFullYear());

  const days = generateDays(month, year);
  const years = generateYears();

  // Adjust day if it exceeds days in month
  useEffect(() => {
    const maxDay = days.length;
    if (day > maxDay) {
      setDay(maxDay);
    }
  }, [month, year, days.length, day]);

  // Update parent when values change
  useEffect(() => {
    const newDate = new Date(year, month, Math.min(day, days.length));
    onDateChange(newDate);
  }, [month, day, year, days.length, onDateChange]);

  const yearIndex = years.indexOf(year);

  return (
    <div 
      className="bg-white rounded-xl shadow-lg border border-border overflow-hidden"
      style={{ 
        width: '170px',
        fontFamily: 'Montserrat, sans-serif'
      }}
    >
      {/* Picker wheels */}
      <div className="flex items-center justify-between px-2 py-2 gap-1">
        {/* Month wheel */}
        <div className="flex-[1.2]">
          <WheelColumn
            items={months}
            selectedIndex={month}
            onSelect={setMonth}
          />
        </div>
        
        {/* Day wheel */}
        <div className="flex-[0.6]">
          <WheelColumn
            items={days}
            selectedIndex={day - 1}
            onSelect={(index) => setDay(index + 1)}
          />
        </div>
        
        {/* Year wheel */}
        <div className="flex-[0.8]">
          <WheelColumn
            items={years}
            selectedIndex={yearIndex >= 0 ? yearIndex : 5}
            onSelect={(index) => setYear(years[index])}
          />
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-1.5 px-2 pb-2">
        <button 
          onClick={onClose}
          className="flex-1 px-2 py-1.5 text-[9px] font-medium text-muted-foreground bg-muted rounded-md hover:bg-gray-200 transition-colors"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          Clear
        </button>
        <button 
          onClick={onApply}
          className="flex-1 px-2 py-1.5 text-[9px] font-medium text-primary-foreground bg-primary rounded-md hover:opacity-90 transition-opacity"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          Apply
        </button>
      </div>
    </div>
  );
};
