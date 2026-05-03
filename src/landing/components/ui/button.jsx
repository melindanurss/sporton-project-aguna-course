const Button = ({ children, className = "", variant = "primary", size = "normal", ...props }) => {
  const baseStyles = "inline-flex gap-2 duration-300 justify-center items-center cursor-pointer hover:scale-105 rounded font-medium transition-all";

  const variants = {
    primary: "bg-primary text-white hover:bg-primary/85",
    dark: "bg-dark text-white hover:bg-dark/85",
    ghost: "bg-transparent hover:bg-gray-100 text-dark border border-gray-300",
    square: "bg-primary text-white hover:bg-primary/85 w-10 h-10 rounded-lg",
  };

  const sizes = {
    normal: "py-4 px-9",
    small: "py-[10px] px-7",
    square: "p-0",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;