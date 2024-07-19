

interface CustomInputProps {
    placeHolder?: string;
    type?: string;
  }
  const CustomInput: React.FC<CustomInputProps> = ({ placeHolder,type}) => {
    return (
        <input type={type}
        placeholder={placeHolder}
        style={{ 
            height:"21px",
            width:"300px",
            borderRadius:"3px",
            padding:"5px"}} 
        />
    );
  };
  
  export default CustomInput;
  