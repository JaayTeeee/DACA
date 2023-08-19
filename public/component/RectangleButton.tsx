import { Button, Text } from "@chakra-ui/react";

interface ButtonProps {
  onClick?: any;
  text: string;
}
export const RectangleButton = (ButtonProps: {
  onClick: any;
  text: any;
  buttonStyle?: any;
  textStyle?: any;
}) => {
  const { onClick, text, buttonStyle, textStyle } = ButtonProps;

  return (
    <div className="mt-5">
      <Button
        className="button fade-in"
        style={{ transition: "ease-in" }}
        onClick={onClick}
        {...buttonStyle}
      >
        <Text
          color="white"
          fontFamily="Noto Sans"
          fontWeight="bold"
          {...textStyle}
        >
          {text}
        </Text>
      </Button>
    </div>
  );
};
