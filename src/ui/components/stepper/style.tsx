import { styled } from "@mui/material/styles";

const style = {
  Root: styled("div")(({ theme }) => ({})),
  Text: styled("div")(({ theme }) => ({
    fontFamily: theme.fontFamily.primary,
    fontSize: "1.1em",
    padding: "15px",
    paddingTop: "35px",
  })),
};

export default style;
