import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

const style = {
  Root: styled("div")(({ theme }) => ({
    ...theme.myBreakpoints.app,
    backgroundColor: theme.colors.primary,
    width: "100%",
    height: theme.header.height,

    boxSizing: "border-box",
    position: "fixed",

    top: 0,
    zIndex: 10000,
  })),
  Navbar: styled(Grid)(({ theme }) => ({
    width: "100%",
    height: "100%",
  })),
  NavbarLogo: styled("div")(({ theme }) => ({
    color: theme.colors.primary,
  })),
  NavbarElemContainer: styled(Grid)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    paddingLeft: "12.5px",
    paddingRight: "12.5px",
    cursor: "pointer",
  })),
  NavbarElem: styled("div")(({ theme }) => ({
    color: theme.colors.black,
    fontFamily: theme.fontFamily.primary,
    fontWeight: 400,
    fontSize: "0.95em",
  })),
  NavbarSpace: styled(Grid)(({ theme }) => ({
    width: "2.5px",
    borderRadius: "100px",
    backgroundColor: "lightgrey",
    height: "25px",
    marginLeft: "30px",
    marginRight: "30px",
  })),
  NavbarAccount: styled("div")(({ theme }) => ({
    color: theme.colors.black,
    fontFamily: theme.fontFamily.primary,
    fontWeight: 400,
    border: `1px solid ${theme.colors.black}`,
    padding: "0px 10px 0px 10px",
    cursor: "pointer",
    fontSize: "0.95em",
    borderRadius: "1px",
  })),
  NavbarChain: styled("div")(({ theme }) => ({
    color: theme.colors.black,
    fontFamily: theme.fontFamily.primary,
    fontWeight: 400,
    border: `1px solid ${theme.colors.primary}`,
    marginRight: "10px",
    fontSize: "0.95em",
  })),
  ModalTitle: styled("div")(({ theme }) => ({
    color: theme.colors.black,
    fontFamily: theme.fontFamily.primary,
    fontWeight: 600,
    fontSize: "1.15em",
  })),
  //
  WalletTypoDripNft: styled("div")(({ theme }) => ({
    fontFamily: theme.fontFamily.primary,
    fontWeight: 600,
    fontSize: "0.8em",
    marginRight: "5px",
    paddingTop: "5px",
    paddingBottom: "5px",
  })),
  WalletTypoDripAction: styled("div")(({ theme }) => ({
    fontFamily: theme.fontFamily.primary,
    fontWeight: 600,
    fontSize: "0.9em",
    color: "#3366BB",
    borderRadius: "5px",
  })),
  WalletTypoCollection: styled("div")(({ theme }) => ({
    fontFamily: theme.fontFamily.primary,
    fontWeight: 600,
    letterSpacing: "0.25px",
    fontSize: "0.85em",
    paddingLeft: "10px",
    paddingRight: "10px",
    borderRadius: "5px",
    color: "grey",
    backgroundColor: theme.colors.secondary,
  })),
  WalletTypoCollectionDrop: styled("div")(({ theme }) => ({
    fontFamily: theme.fontFamily.primary,
    fontWeight: 600,
    fontSize: "0.9em",
  })),
  WalletTypoDripId: styled("div")(({ theme }) => ({
    fontFamily: theme.fontFamily.primary,
    fontWeight: 600,
    letterSpacing: "0.5px",
    fontSize: "0.9em",
    paddingLeft: "10px",
    paddingRight: "10px",
    borderRadius: "5px",
    backgroundColor: theme.colors.secondary,
  })),
};

export default style;
