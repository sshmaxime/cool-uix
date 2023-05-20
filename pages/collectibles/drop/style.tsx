import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

const style = {
  Root: styled("div")(({ theme }) => ({
    paddingTop: theme.header.height,
    backgroundColor: theme.colors.primary,
  })),
  Grid3d: styled(Grid)(({ theme }) => ({
    height: `calc(100vh - ${theme.header.height})`,
    backgroundColor: theme.colors.primary,
  })),
  GridInfoContainer: styled(Grid)(({ theme }) => ({
    backgroundColor: theme.colors.secondary,
  })),
  GridInfo: styled(Grid)(({ theme }) => ({
    minHeight: `calc(100vh - ${theme.header.height})`,
    padding: "15px",
  })),
  GridInfoBrand: styled("div")(({ theme }) => ({
    fontFamily: theme.fontFamily.primary,
    fontWeight: 600,
    fontSize: "0.9em",
  })),
  GridInfoTitle: styled("div")(({ theme }) => ({
    fontFamily: theme.fontFamily.secondary,
    fontWeight: 900,
    fontSize: "1.1em",
  })),
  GridInfoSupply: styled("div")(({ theme }) => ({
    fontFamily: theme.fontFamily.primary,
    color: "grey",
    fontWeight: 400,
    fontSize: "0.9em",
  })),
  GridInfoVersionContainer: styled(Grid)(({ theme }) => ({
    marginTop: "10px",
  })),
  GridInfoVersion: styled("div")(({ theme }) => ({
    fontFamily: theme.fontFamily.primary,
    fontWeight: 400,
    fontSize: "0.9em",
  })),
  GridInfoPrice: styled("div")(({ theme }) => ({
    fontFamily: theme.fontFamily.primary,
    fontWeight: 600,
    fontSize: "0.9em",
  })),
  Question: styled("div")(({ theme }) => ({
    fontFamily: theme.fontFamily.primary,
    color: theme.colors.black,
    fontWeight: 600,
    fontSize: "0.9em",
    backgroundColor: theme.colors.primary,
    padding: "5px 10px 5px 10px",
    display: "inline-block",
    borderRadius: "5px",
    boxShadow: `1px 1px 5px ${"lightgrey"}, -1px -1px 5px ${"lightgrey"}`,
  })),
  GridInfoDescription: styled("div")(({ theme }) => ({
    // marginTop: "25px",
    fontFamily: theme.fontFamily.primary,
    fontWeight: 300,
    fontSize: "0.85em",
    color: "grey",
  })),
  ButtonMint: styled("div")(({ theme }) => ({
    width: "100%",
    backgroundColor: theme.colors.black,
    color: theme.colors.primary,
    textAlign: "center",
    padding: "5px",
    fontSize: "0.9em",
  })),
  ModalExplain: styled("div")(({ theme }) => ({
    color: theme.colors.black,
    backgroundColor: theme.colors.tertiary,
    padding: "16px",
    borderRadius: "24px",
    minWidth: "800px",
  })),
};

export default style;
