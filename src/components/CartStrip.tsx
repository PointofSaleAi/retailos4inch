interface CartStripProps {
  itemCount: number;
  totalAmount: number;
}

export const CartStrip = ({ itemCount, totalAmount }: CartStripProps) => {
  if (itemCount === 0) return null;

  return (
    <div 
      className="w-full bg-[#1A1A1A] text-white flex items-center justify-between px-3 py-2.5 flex-shrink-0"
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      <span className="text-sm font-medium">
        {itemCount} {itemCount === 1 ? 'Product' : 'Products'}
      </span>
      <span className="text-sm font-semibold">
        ${totalAmount.toFixed(2)}
      </span>
    </div>
  );
};
