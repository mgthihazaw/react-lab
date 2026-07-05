type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  type = "button",
}) => {
  return (
    <button onClick={onClick} disabled={disabled} type={type}>
      {children}
    </button>
  );
};
