

interface CustomButtonProps {
    value?: string;
    id?:string;
    onClick?: () => void;
  }
  const basketButton: React.FC<CustomButtonProps> = ({ id, value = "Submit", onClick }) => {
    return (
      <button
        id={id}
        onClick={onClick}
        style={{
          marginTop: "15px",
          backgroundColor: "white",
          padding: "10px 20px",
          borderRadius: "5px",
          color: "black",
          border: "none",
          cursor: "pointer",
          float:"left",
          
        }}
      >
        {value}
      </button>
    );
  };
  
  export default basketButton;
  