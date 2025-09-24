import css from "./Button.module.scss"

export interface ButtonProps {
    children: React.ReactNode;
    size?: 'small' | 'medium' | 'large';
    color?: 'blue' | "green" | 'red' | 'gray' | "orange";
    onClick?: () => void;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    size = 'meduim',
    color = 'blue',
    onClick,
    disabled = false
}) => {
    const buttonClass = `${css.button} ${css[`button--${size}`]} ${css[`button--${color}`]}`

    return (
        <button
            className={buttonClass}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}
export default Button;