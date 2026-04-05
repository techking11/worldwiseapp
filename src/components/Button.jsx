import styles from "./Button.module.css";

function Button({ onClick, type, children, disabled = false }) {
  return (
    <button
      className={`${styles.btn} ${styles[type]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
