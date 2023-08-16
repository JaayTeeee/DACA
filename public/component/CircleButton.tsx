"use client";

import { Button } from "@chakra-ui/react";
import Image from "next/image";

interface ImageProps {
  imgSrc: any;
  desc: string;
  buttonStyle?: React.CSSProperties;
  imgStyle?: React.CSSProperties;
  onClick?: any;
}
export const CircleButton = ({
  imgSrc,
  desc,
  buttonStyle,
  imgStyle,
  onClick,
}: ImageProps) => {
  return (
    <Button
      style={{
        width: "55px",
        height: "55px",
        borderRadius: "100px",
        backgroundColor: "#D9D9D9",
        alignContent: "center",
        marginLeft: "20px",
        ...buttonStyle,
      }}
      onClick={onClick}
    >
      <Image
        src={imgSrc}
        alt={desc}
        style={{ width: "70%", height: "70%", ...imgStyle }}
      />
    </Button>
  );
};
