interface CartStripProps {
  itemCount: number;
  totalAmount: number;
  onClick?: () => void;
}

export const CartStrip = ({ itemCount, totalAmount, onClick }: CartStripProps) => {
  if (itemCount === 0) return null;

  return (
    <div 
      className="w-full h-[24px] bg-[#1A1A1A] text-white flex items-center justify-between px-3 flex-shrink-0 cursor-pointer hover:bg-[#2A2A2A] transition-colors"
      style={{ fontFamily: 'Montserrat, sans-serif' }}
      onClick={onClick}
    >
      <span className="text-[10px] font-medium">
        {itemCount} {itemCount === 1 ? 'Product' : 'Products'}
      </span>
      <span className="text-[10px] font-semibold">
        ${totalAmount.toFixed(2)}
      </span>
    </div>
  );
};
