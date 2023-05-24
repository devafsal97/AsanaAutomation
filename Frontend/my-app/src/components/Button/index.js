import MaterialButton from "@mui/material/Button";

const Button = ({ type = "button", label, isLoading, size }) => {
  const buttonSize = size || "medium";
  return (
    <MaterialButton variant="contained" type={type} fullWidth size={buttonSize}>
      {isLoading ? "loading" : label}
    </MaterialButton>
  );
};

export default Button;
