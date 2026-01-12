import css from "./Input.module.scss";

interface InputProps {
  children: React.ReactNode;
  containerSize: "small";
  id: string;
  inputSize: number;
  color: string;
  layout: "vertical" | "horizontal";
  placeholder: string;
  onChange: (amount: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const Input: React.FC<InputProps> = ({
  children,
  containerSize,
  inputSize,
  id,
  color,
  layout,
  onChange,
  placeholder,
  type,
}) => {
  const inputContainerClass = `${css.input} ${css[`input--${containerSize}`]} ${
    css[`input--${color}`]
  } ${css[`input--${layout}`]}`;
  return (
    <div className={inputContainerClass}>
      <label htmlFor={id}>{children}</label>
      <input
        id={id}
        size={inputSize}
        className={css.inputField}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
      />
    </div>
  );
};

export default Input;
