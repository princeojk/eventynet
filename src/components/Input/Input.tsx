import css from "./Input.module.scss";

export interface InputProps {
  children: React.ReactNode;
  size: number;
  id: string;
}

const Input: React.FC<InputProps> = ({ children, size, id }) => {
  return (
    <div className={css.input}>
      <label htmlFor={id}>{children}</label>
      <input id={id} size={size} className={css.inputField} />
    </div>
  );
};

export default Input;
