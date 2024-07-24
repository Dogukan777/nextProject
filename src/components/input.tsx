interface CustomInputProps {
  name?: string;
  value?: string;
  placeHolder?: string;
  type?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;

}

const CustomInput: React.FC<CustomInputProps> = ({ name, value, placeHolder, type = "text", onChange }) => {
  return (
      <input
          type={type}
          name={name}
          placeholder={placeHolder}
          value={value}
          onChange={onChange}
          style={{
              height: "22px",
              width: "304px",
              borderRadius: "3px",
              padding: "5px"
          }}
      />
  );
};

export default CustomInput;
