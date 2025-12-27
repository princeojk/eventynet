import css from "./Button.module.scss";

export interface ButtonProps {
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
  color?: "blue" | "green" | "red" | "gray" | "orange" | "pink";
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  size = "medium",
  color = "blue",
  onClick,
  disabled = false,
}) => {
  const buttonClass = `${css.button} ${css[`button--${size}`]} ${
    css[`button--${color}`]
  }`;

  return (
    <button
      type="button"
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
export default Button;
