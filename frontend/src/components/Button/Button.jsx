import styles from "./styles/button.module.css";

export const Button = ({ type, btnName, className }) => {
  const buttonClass = `${styles[className] || ""}`;

  return (
    <button className={buttonClass} type={type}>
      {btnName}
    </button>
  );
};
