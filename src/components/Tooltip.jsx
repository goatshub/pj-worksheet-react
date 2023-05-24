const Tooltip = ({ children, message }) => {
  if (!message) return children;
  return (
    <div className="group relative flex">
      <div className="transition-all group-hover:scale-125">{children}</div>
      <span
        className={`absolute left-10 scale-0 sm:w-max max-w-xxs md:max-w-xs transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100 z-50`}
      >
        {message}
      </span>
    </div>
  );
};
export default Tooltip;
