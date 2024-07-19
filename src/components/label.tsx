

interface CustomLabelProps {
    message?: string;
    id?: string;
  }
  const LabelMessage: React.FC<CustomLabelProps> = ({ message ,id}) => {
    return (
        <span id={id}
        style={{ 
            display: 'none', 
            fontSize: '13px',
            color:"red",
            fontWeight:"550"}}> 
        {message}
        </span>
    );
  };
  
  export default LabelMessage;
  