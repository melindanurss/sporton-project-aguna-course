const Button = ({ children, className = "", variant = "primary", size = "normal", ...props }) => {
  const baseStyles = "inline-flex gap-2 duration-300 justify-center items-center cursor-pointer hover:scale-105 rounded-lg font-medium";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary/85",
    dark: "bg-dark text-white hover:bg-dark/85",
    ghost: "bg-transparent hover:bg-gray-100 text-dark border border-gray-200",
  };
  
  const sizes = {
    normal: "py-3 px-8",
    small: "py-2 px-6",
  };
  
  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;