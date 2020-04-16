import * as React from "react";
import Grid from "@material-ui/core/Grid";

interface Props {
  text: string;
}

const Banner: React.FC<Props> = ({ text }) => {
  return (
    <Grid container>
      <Grid item>{text}</Grid>
    </Grid>
  );
};

export default Banner;
