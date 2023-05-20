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
    position: "relative",
  })),
  GridInfo: styled(Grid)(({ theme }) => ({
    minHeight: `calc(100vh - ${theme.header.height})`,
    padding: "15px",
    width: "100%",
    position: "absolute",
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
  ViewDrop: styled("div")(({ theme }) => ({
    color: theme.colors.black,
    fontSize: "0.8em",
  })),
  CollectionName: styled("div")(({ theme }) => ({
    fontFamily: theme.fontFamily.primary,
    fontWeight: 600,
    letterSpacing: "0.5px",
    fontSize: "0.9em",
    display: "inline-block",
    padding: "5px",
    paddingLeft: "5px",
    paddingRight: "5px",
    marginBottom: "0px",
    color: theme.colors.black,
    backgroundColor: theme.colors.secondary,
    borderRadius: "5px",
  })),
  HeaderLeftSide: styled("div")(({ theme }) => ({
    padding: "2.5px",
    marginBottom: "5px",
  })),
  StepTitle: styled("div")(({ theme }) => ({
    fontFamily: theme.fontFamily.primary,
    fontWeight: 600,
    fontSize: "0.9em",
  })),
  InnerLeftSide: styled("div")(({ theme }) => ({
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: theme.colors.primary,
    height: "60vh",
    overflow: "auto",
  })),
  CurrentItem: styled("div")(({ theme }) => ({
    fontFamily: theme.fontFamily.primary,
    fontSize: "1em",
  })),
};

export default style;
