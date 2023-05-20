import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

const style = {
  Root: styled("div")<{ isDisabled: boolean; animate: boolean; inline: boolean }>(
    ({ theme, isDisabled, animate, inline }) => ({
      display: inline ? "inline-flex" : "block",
      alignItems: "center",
      justifyContent: "center",
      cursor: isDisabled ? "" : "pointer",
      opacity: isDisabled ? "25%" : "",
      transition: "all 0.5s ease",
      transformOrigin: "left top",
      ":hover": {
        scale: animate ? "1.05" : "",
      },
    })
  ),
};

export default style;
