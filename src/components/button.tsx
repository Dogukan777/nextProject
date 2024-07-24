

interface CustomButtonProps {
  value?: string;
  onClick?: () => void;
}
const CustomButton: React.FC<CustomButtonProps> = ({ value = "Submit", onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        marginTop: "15px",
        backgroundColor: "green",
        padding: "10px 20px",
        borderRadius: "5px",
        color: "white",
        border: "none",
        cursor: "pointer",
        float:"left"
      }}
    >
      {value}
    </button>
  );
};

export default CustomButton;
