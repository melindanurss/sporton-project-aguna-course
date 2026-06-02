"use client";

const Button = ({ children, variant = "primary", size = "md", className = "", onClick, ...props }) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 cursor-pointer";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary/85 hover:scale-105 rounded-xl px-6 py-3",
    dark: "bg-gray-900 text-white hover:bg-primary hover:scale-105 rounded-xl px-6 py-3",
    ghost: "bg-transparent text-dark hover:text-primary border border-gray-300 hover:border-primary rounded-xl px-6 py-3",
    square: "bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 w-10 h-10 p-0 flex items-center justify-center",
  };
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;