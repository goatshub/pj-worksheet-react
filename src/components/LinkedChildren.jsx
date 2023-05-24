const LinkedChildren = ({ children, to, className }) => {
  if (!to) return <div className={className}>{children}</div>;
  return (
    <a
      href={to}
      target="_blank"
      rel="noopener"
      className={`${className} hover:ring `}
    >
      {children}
    </a>
  );
};
export default LinkedChildren;
