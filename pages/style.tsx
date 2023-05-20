import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

const style = {
  Root: styled("div")(({ theme }) => ({
    marginTop: theme.header.height,

    ...theme.myBreakpoints.app,
  })),
};

export default style;
