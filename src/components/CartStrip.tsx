interface CartStripProps {
  itemCount: number;
  totalAmount: number;
}

export const CartStrip = ({ itemCount, totalAmount }: CartStripProps) => {
  if (itemCount === 0) return null;

  return (
    <div 
      className="w-full h-[24px] bg-[#1A1A1A] text-white flex items-center justify-between px-3 flex-shrink-0"
      style={{ fontFamily: 'Montserrat, sans-serif' }}
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
