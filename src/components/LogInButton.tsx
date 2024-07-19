import { useRouter } from "next/navigation";



interface CustomButtonProps {
  value?: string;
  onClick?: () => void;
}

const LogInButton: React.FC<CustomButtonProps> = ({ value = "Submit", onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: "blue",
        padding: "10px 20px",
        borderRadius: "5px",
        color: "white",
        border: "none",
        cursor: "pointer",
      }}
    >
      {value}
    </button>
  );
};

  
  export default LogInButton;
  