import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

const style = {
  Root: styled("div")(({ theme }) => ({
    height: `calc(100vh - ${theme.header.height})`,
    marginTop: theme.header.height,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  })),
  ComingSoon: styled("div")(({ theme }) => ({
    color: theme.colors.black,
    fontFamily: theme.fontFamily.primary,
  })),
};

export default style;
