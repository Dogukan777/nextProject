

interface CustomInputProps {
    placeHolder?: string;
    type?: string;
  }
  const CustomSearchInput: React.FC<CustomInputProps> = ({ placeHolder,type}) => {
    return (
        <input type={type}
        placeholder={placeHolder}
        style={{ 
            height:"21px",
            width:"200px",
            borderRadius:"3px",
            padding:"5px",
            marginLeft:"20px",
            float:"right",
            marginTop:"5px"
            }} 
        />
    );
  };
  
  export default CustomSearchInput;
  