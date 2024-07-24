

interface CustomButtonProps {
    id?:string;
    value?: string;
    onClick?: () => void;
  }
  const CustomDeleteButton: React.FC<CustomButtonProps> = ({ id, value = "Submit", onClick }) => {
    return (
      <button
        id={id}
        onClick={onClick}
        style={{
          marginTop: "25px",
          backgroundColor: "#C40014",
          padding: "10px 20px",
          borderRadius: "5px",
          color: "white",
          border: "none",
          cursor: "pointer",
          float:"left",
          marginLeft:"60px"
        }}
      >
        {value}
      </button>
    );
  };
  
  export default CustomDeleteButton;
  