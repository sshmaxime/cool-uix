import { IconEth } from "@/assets/index";
import { Button, Faq, Stepper } from "src/ui/index";
import { useDrop, useMint } from "@/hooks/api";
import { formatEther } from "@ethersproject/units";
import { ClickAwayListener, Portal } from "@mui/base";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Backdrop, Grid, useTheme } from "@mui/material";
import { animated, useSpring } from "@react-spring/web";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAccount } from "wagmi";
import DropSceneLoader, { sceneRef } from "../../../src/3d/scenes/drop_0";
import Style from "./style";

export default function Drop() {
  const sceneRef = React.useRef<sceneRef>(null!);
  const router = useRouter();
  const dropId = Number(router.query.dropId);
  const theme = useTheme();
  const { drop } = useDrop(dropId);

  const { isDisconnected } = useAccount();

  const { mint, mintReset, isMintLoading, isMintDone, isMintError, mintData } = useMint();

  const [showSelectVersionDrawer, setShowSelectVersionDrawer] = React.useState(false);
  console.log(showSelectVersionDrawer);
  const toggleSelectNFTDrawer = () => {
    setShowSelectVersionDrawer(!showSelectVersionDrawer);
  };
  const handleClickAwaySelectNFTDrawer = () => {
    if (showSelectVersionDrawer) {
      setShowSelectVersionDrawer(false);
    }
  };

  const [selectedDripVersion, setSelectedVersion] = React.useState(0);

  const updateVersion = (version: number) => {
    if (!sceneRef.current) return;
    setSelectedVersion(version);
    sceneRef.current.updateVersion(version);
  };

  const springPropsSelectVersionDrawer = useSpring({
    from: {
      position: "fixed",
      boxShadow: "5px 5px 5px #bebebe, -1px -1px 10px lightgrey",
      width: "calc(100vw / 12 * 3.5)",
      right: "0",
      padding: "10px",
      zIndex: 100,
    },
    to: {
      bottom: !showSelectVersionDrawer ? -500 : 0,
    },
  });

  const [open, setOpen] = useState(false);

  return (
    <Style.Root>
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: "rgba(0, 0, 0, 0.3)" }}
        open={open}
      >
        <Style.ModalExplain>
          <Stepper fct={() => setOpen(false)} />
        </Style.ModalExplain>
      </Backdrop>

      <Grid container>
        <Style.Grid3d item xs={8.5}>
          {drop && (
            <DropSceneLoader
              sceneRef={sceneRef}
              model={drop.metadata.model}
              versions={drop.metadata.versions}
              initialVersion={0}
              initialPlaceholderTexture={"/placeholder.png"}
              initialDropId={drop.id}
              initialDripId={0}
              initialMaxSupply={drop.maxSupply}
            />
          )}
        </Style.Grid3d>

        <Style.GridInfoContainer item xs={3.5}>
          <Style.GridInfo
            container
            direction="column"
            justifyContent={"space-between"}
            alignItems={"space-between"}
            style={{ height: "100%" }}
          >
            <Grid item>
              <Button inline animate onClick={() => setOpen(true)}>
                <Style.Question>How does that work ?</Style.Question>
              </Button>
            </Grid>
            <Grid item>
              <Grid container direction="column">
                {drop && <Style.GridInfoBrand>DROP #{drop.id}</Style.GridInfoBrand>}

                <Grid item>
                  {drop && (
                    <Grid container justifyContent="space-between">
                      <Grid item>
                        <Style.GridInfoTitle>VIRGIN SKATEBOARD</Style.GridInfoTitle>
                      </Grid>
                      <Grid item>
                        <Grid container spacing={0.5}>
                          <Grid item>
                            <IconEth style={{ width: "10px", height: "20px" }} />
                          </Grid>
                          <Grid item>
                            <Style.GridInfoPrice>
                              {formatEther(drop.price).toString()}
                            </Style.GridInfoPrice>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  )}

                  {drop && (
                    <Grid item>
                      <Style.GridInfoSupply>
                        {drop.currentSupply} / {drop.maxSupply} (Minted)
                      </Style.GridInfoSupply>
                    </Grid>
                  )}

                  {drop && (
                    <ClickAwayListener onClickAway={handleClickAwaySelectNFTDrawer}>
                      <div>
                        <Button onClick={toggleSelectNFTDrawer}>
                          <Style.GridInfoVersionContainer
                            container
                            style={{
                              color: selectedDripVersion === 0 ? "white" : theme.colors.black,
                              backgroundColor: drop.metadata.versions[selectedDripVersion].color,
                            }}
                            columnSpacing={0.5}
                          >
                            <Grid item>
                              <Style.GridInfoVersion>
                                {drop.metadata.versions[selectedDripVersion].name}
                              </Style.GridInfoVersion>
                            </Grid>

                            <Grid item style={{ display: "flex", alignItems: "center" }}>
                              <KeyboardArrowDownIcon
                                style={{
                                  fontSize: "1.1em",
                                  transform: showSelectVersionDrawer ? "rotate(180deg)" : "",
                                }}
                              />
                            </Grid>
                          </Style.GridInfoVersionContainer>
                        </Button>

                        <Portal>
                          <animated.div
                            className={"container-swiper"}
                            style={springPropsSelectVersionDrawer as any}
                          >
                            <swiper-container
                              slides-per-view={3.75}
                              space-between={10}
                              style={{ height: "100%" }}
                            >
                              {drop &&
                                drop.metadata.versions.map((item) => (
                                  <swiper-slide key={item.id} style={{ height: "100%" }}>
                                    <Button onClick={() => updateVersion(item.id)}>
                                      <div
                                        style={{
                                          height: "20vh",
                                          backgroundColor: item.color,
                                          border: `1.5px solid ${
                                            selectedDripVersion === item.id
                                              ? theme.colors.black
                                              : "transparent"
                                          }`,
                                        }}
                                      />
                                      <div style={{ height: "1.7rem" }}>
                                        <div
                                          style={{
                                            fontSize: "0.75em",
                                            fontWeight: 400,
                                            marginTop: "0.3rem",
                                          }}
                                        >
                                          {item.name}
                                        </div>
                                      </div>
                                    </Button>
                                  </swiper-slide>
                                ))}
                            </swiper-container>
                          </animated.div>
                        </Portal>
                      </div>
                    </ClickAwayListener>
                  )}

                  <div
                    style={{
                      marginTop: "3.5vh",
                      marginBottom: "4vh",
                      height: "1px",
                      backgroundColor: "lightgrey",
                    }}
                  />

                  {drop && (
                    <Faq
                      content={[
                        {
                          question: "Specifications",
                          answer: (
                            <Style.GridInfoDescription>
                              <b
                                style={{
                                  fontWeight: 400,
                                  color: "black",
                                  fontFamily: theme.fontFamily.primary,
                                }}
                              >
                                Deck
                              </b>
                              : Maple USA. Canadian Maple in 7 sheets with pressing made in Europe.
                              <br />
                              <b
                                style={{
                                  fontWeight: 400,
                                  color: "black",
                                  fontFamily: theme.fontFamily.primary,
                                }}
                              >
                                Graphic
                              </b>
                              : Full color HD SlipLayer printing.
                            </Style.GridInfoDescription>
                          ),
                        },
                      ]}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Button
                isDisabled={isMintLoading || isDisconnected}
                onClick={() => {
                  mint(drop.id, selectedDripVersion, drop.price);
                }}
              >
                <Style.ButtonMint>{isMintLoading ? "Minting ..." : "MINT"}</Style.ButtonMint>
              </Button>
            </Grid>
          </Style.GridInfo>
        </Style.GridInfoContainer>
      </Grid>
    </Style.Root>
  );
}
