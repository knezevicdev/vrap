import MuiContainer, { ContainerProps } from "@material-ui/core/Container";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import React from "react";

interface Props extends ContainerProps {
  children: React.ReactNode;
  content?: boolean;
}

const Container: React.FC<Props> = (props) => {
  const { content, children, ...rest } = props;
  const theme = useTheme();
  const mdAndUp = useMediaQuery(theme.breakpoints.up("md"));
  if (content) {
    rest.maxWidth = mdAndUp ? "lg" : "sm";
  }
  return <MuiContainer {...rest}>{children}</MuiContainer>;
};

export default Container;
