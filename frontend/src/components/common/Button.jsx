export default function Button({ children, variant = 'primary', ...props }) {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary'
  };

  return (
    <button className={variants[variant]} {...props}>
      {children}
    </button>
  );
}
