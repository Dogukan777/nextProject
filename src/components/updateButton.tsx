

interface CustomButtonProps {
    id?:string;
    value?: string;
    onClick?: () => void;
  }
  const CustomUpdateButton: React.FC<CustomButtonProps> = ({id, value = "Submit", onClick }) => {
    return (
      <button
        id={id}
        onClick={onClick}
        style={{
          marginTop: "25px",
          backgroundColor: "#008BD6",
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
  
  export default CustomUpdateButton;
  