import { Button, Text } from "@chakra-ui/react";

interface ButtonProps {
  onClick?: any;
  text: string;
}
export const RectangleButton = (ButtonProps: { onClick: any; text: any }) => {
  const { onClick, text } = ButtonProps;

  return (
    <div className="mt-5">
      <Button
        className="button fade-in"
        style={{ transition: "ease-in" }}
        onClick={onClick}
      >
        <Text color="white" fontFamily="Noto Sans" fontWeight="bold">
          {text}
        </Text>
      </Button>
    </div>
  );
};
