import { Button } from "antd";

const CommonButton = ({ type = "primary", children, style, ...rest }) => {
  return (
    <Button
      type={type}
      style={{
        backgroundColor: style?.backgroundColor || "#93278f",
        borderColor: style?.backgroundColor || "#93278f",
        color: style?.textColor || "white",
        width: style?.width || "100%",
        ...style,
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default CommonButton;
