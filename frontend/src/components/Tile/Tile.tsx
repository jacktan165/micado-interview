import React, { forwardRef, ForwardRefRenderFunction } from "react";
import { Flex, FlexProps } from "@chakra-ui/react";

export type TileProps = FlexProps;

const Tile: ForwardRefRenderFunction<HTMLInputElement, TileProps> = (
  { children, ...props },
  ref
) => {
  return (
    <Flex {...props} ref={ref} bg="white">
      {children}
    </Flex>
  );
};

export default forwardRef(Tile);
