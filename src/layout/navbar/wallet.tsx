import { IconEtherscan, IconOpensea } from "@/assets/index";
import useDrips from "@/hooks/api/useDrips";
import CloseIcon from "@mui/icons-material/Close";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Drawer, Grid, useTheme } from "@mui/material";
import { DripStatus } from "@premier-labs/contracts/dist/types";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "src/ui/index";
import { NavbarButton } from "./button";
import Style from "./style";

export default function Wallet(props: { address: string | undefined }) {
  const { address } = props;

  const theme = useTheme();
  const router = useRouter();

  const [openWallet, setOpenWallet] = useState(false);
  const toggleWallet = () => setOpenWallet(!openWallet);

  const { drips, refetch, isRefetching } = useDrips(address);

  return (
    <>
      <NavbarButton title="wallet" onClick={toggleWallet} />

      <Drawer
        anchor={"right"}
        open={openWallet}
        onClose={toggleWallet}
        sx={{
          ".MuiBackdrop-root": {
            backgroundColor: theme.colors.light,
          },
          ".MuiDrawer-paper": {
            backgroundColor: theme.colors.primary,
            paddingLeft: "25px",
            paddingRight: "25px",
            boxSizing: "border-box",
            width: "calc(100vw / 12 * 3.5)",
            overflow: "auto",
          },
        }}
      >
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          style={{ height: `calc(${theme.header.height})` }}
        >
          <Grid item style={{ display: "flex", alignItems: "center", gap: 7.5 }}>
            <Style.ModalTitle>Wallet</Style.ModalTitle>

            <Button inline onClick={refetch}>
              <RefreshIcon
                className={"rotate"}
                style={{
                  animationPlayState: isRefetching ? "running" : "paused",
                  height: "16px",
                  width: "16px",
                  color: "black",
                }}
              />
            </Button>
          </Grid>
          <Grid item style={{ display: "flex", alignItems: "center" }}>
            <Button
              inline
              onClick={() => {
                setOpenWallet(false);
              }}
            >
              <CloseIcon style={{ width: "20px", height: "20px" }} />
            </Button>
          </Grid>
        </Grid>

        <div
          style={{
            height: "2px",
            marginBottom: "11px",
            backgroundColor: "grey",
            opacity: "0.1",
          }}
        />

        {drips &&
          drips.map((drip, index) => (
            <Grid item key={index} xs={12}>
              <Grid container>
                <Grid item xs={4} lg={3} xl={1.5}>
                  <img
                    crossOrigin="anonymous"
                    src={drip.img || drip.nft?.img || "/placeholder.png"}
                    style={{ width: "100%" }}
                    alt=""
                  />
                </Grid>
                <Grid item xs={8} lg={9} xl={10.5} style={{ padding: "5px", paddingLeft: "10px" }}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="space-between"
                    style={{ height: "100%", padding: "2.5px" }}
                  >
                    <Grid item>
                      <Grid container justifyContent="space-between">
                        <Grid item>
                          <Grid container columnSpacing={1}>
                            <Grid item>
                              <Style.WalletTypoCollectionDrop>
                                DROP #{drip.drop.id}
                              </Style.WalletTypoCollectionDrop>
                            </Grid>
                            <Grid item>
                              <Style.WalletTypoDripId>#{drip.id}</Style.WalletTypoDripId>
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid item>
                          <Grid container columnSpacing={0.5}>
                            <Grid item>
                              <IconOpensea style={{ width: "16px", height: "16px" }} />
                            </Grid>
                            <Grid item>
                              <Button onClick={() => {}}>
                                <IconEtherscan style={{ width: "16px", height: "16px" }} />
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid container justifyContent="space-between">
                        <Grid item>
                          <Grid container>
                            <Grid item>
                              <Button
                                onClick={() => {
                                  router.push(`/collectibles/drop/${drip.drop.id}/${drip.id}`);
                                  setOpenWallet(false);
                                }}
                              >
                                <Style.WalletTypoDripAction>View</Style.WalletTypoDripAction>
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>
                        {drip.status === DripStatus.MUTATED ? (
                          <Grid item>
                            <Style.WalletTypoDripNft>
                              {drip.nft?.symbol} #{drip.nft?.id}
                            </Style.WalletTypoDripNft>
                          </Grid>
                        ) : (
                          <Grid item>
                            <Style.WalletTypoCollection>MUTABLE</Style.WalletTypoCollection>
                          </Grid>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <div
                style={{
                  height: "1px",
                  marginTop: "5px",
                  marginBottom: "11px",
                  backgroundColor: "grey",
                  opacity: "0.1",
                }}
              />
            </Grid>
          ))}
      </Drawer>
    </>
  );
}
