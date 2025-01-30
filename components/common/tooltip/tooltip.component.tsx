interface ITooltipProps {
  text: string;
  children: React.ReactNode;
  isVisible: boolean;
  onShow: () => void;
  onHide: () => void;
}

const Tooltip: React.FC<ITooltipProps> = ({
  text,
  children,
  isVisible,
  onShow,
  onHide,
}) => {
  const handleMouseEnter = () => {
    onShow?.();
  };

  const handleMouseLeave = () => {
    onHide?.();
  };

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isVisible && (
        <div className="absolute z-20 whitespace-nowrap bg-white text-black text-sm px-2 py-1 rounded shadow-lg top-full -translate-x-1/2 mt-2">
          {text}
        </div>
      )}
    </div>
  );
};

export { Tooltip };
