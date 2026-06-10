"use client";

type TButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "dark" | "ghost" | "success" | "danger";
  size?: "normal" | "small";
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  children,
  className,
  variant = "primary",
  size = "normal",
  type = "button",
  onClick,
  disabled = false,
  ...props
}: TButtonProps) => {
  const baseStyles = "inline-flex gap-2 items-center justify-center font-medium transition-all duration-300 cursor-pointer rounded-xl";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary/85",
    dark: "bg-dark text-white hover:bg-primary",
    ghost: "bg-transparent text-gray-700 hover:text-primary border border-gray-300 hover:border-primary",
    success: "bg-green-500 text-white hover:bg-green-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };
  
  const sizes = {
    normal: "px-6 py-3",
    small: "px-4 py-2 text-sm rounded-lg",
  };
  
  const variantClass = variants[variant] || variants.primary;
  const sizeClass = sizes[size] || sizes.normal;
  const disabledClass = disabled ? "opacity-50 cursor-not-allowed hover:scale-100" : "hover:scale-105";

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantClass} ${sizeClass} ${disabledClass} ${className}`.trim()}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;