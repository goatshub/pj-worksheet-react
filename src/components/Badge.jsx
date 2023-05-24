const Badge = ({ color, message }) => {
  if (color === "green") {
    return (
      <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
        {message}
      </span>
    );
  } else if (color === "yellow") {
    return (
      <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
        {message}
      </span>
    );
  } else if (color === "red") {
    return (
      <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
        {message}
      </span>
    );
  } else if (color === "grey") {
    return (
      <span className="inline-flex items-center rounded-md bg-gray-300 px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-500/10">
        {message}
      </span>
    );
  } else {
    return (
      <span className="inline-flex items-center border border-gray-300 rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
        {message}
      </span>
    );
  }
};
export default Badge;
