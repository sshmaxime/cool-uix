import { Button, Faq } from "src/ui/index";
import { useDrip, useMint, useMutate, useNfts } from "@/hooks/api";
import { placeholderItem, ShortenAddress } from "@/utils/index";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import { useTheme, Grid, ImageList, ImageListItem, Skeleton } from "@mui/material";
import { NFT, dripStatus } from "@premier-labs/contracts/dist/types";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import DropSceneLoader, { sceneRef } from "../../../../src/3d/scenes/drop_0";
import Style from "./style";
import { animated, useSpring, useTransition } from "@react-spring/web";

export default function Drip() {
  const sceneRef = React.useRef<sceneRef>(null!);
  const router = useRouter();

  const dropId = Number(router.query.dropId);
  const dripId = Number(router.query.dripId);

  const theme = useTheme();

  const { drip } = useDrip(dropId, dripId);
  const drop = drip?.drop;

  const { isDisconnected, address } = useAccount();

  const { mutate, mutateReset, isMutateLoading, isMutateDone, isMutateError, mutateData } =
    useMutate();

  const [showSelectVersionDrawer, setShowSelectVersionDrawer] = React.useState(false);

  const [selectedNFT, setSelectedNFT] = useState<NFT>(placeholderItem);

  const toggleSelectNFTDrawer = () => {
    setShowSelectVersionDrawer(!showSelectVersionDrawer);
  };
  const handleClickAwaySelectNFTDrawer = () => {
    if (showSelectVersionDrawer) {
      setShowSelectVersionDrawer(false);
    }
  };

  const updateItem = (newItem: NFT) => {
    if (!sceneRef.current) return;
    setSelectedNFT(newItem);
    sceneRef.current.updateItem(newItem.img);
  };

  const resetItem = () => {
    if (!sceneRef.current) return;
    setSelectedNFT(placeholderItem);
    sceneRef.current.updateItem(placeholderItem.img);
  };

  const { nfts, isNftsLoading, isNftsError } = useNfts(address, {
    enabled: !isDisconnected,
  });

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

  const a = [
    <Style.GridInfo
      container
      direction="column"
      justifyContent={"space-between"}
      alignItems={"space-between"}
      style={{ height: "100%" }}
    >
      <Grid item>
        <Button inline animate onClick={() => {}}>
          <Style.Question>How does that work ?</Style.Question>
        </Button>
      </Grid>
      <Grid item>
        <Grid container direction="column">
          {drop && (
            <Style.GridInfoBrand>
              DROP #{drop.id} / #{drip.id}
            </Style.GridInfoBrand>
          )}

          <Grid item>
            {drop && <Style.GridInfoTitle>VIRGIN SKATEBOARD</Style.GridInfoTitle>}

            {drop && (
              <Style.GridInfoVersionContainer
                container
                style={{
                  color: drip.version === 0 ? "white" : theme.colors.black,
                  backgroundColor: drop.metadata.versions[drip.version].color,
                }}
                columnSpacing={0.5}
              >
                <Grid item>
                  <Style.GridInfoVersion>
                    {drop.metadata.versions[drip.version].name}
                  </Style.GridInfoVersion>
                </Grid>
              </Style.GridInfoVersionContainer>
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
                    question: "Information",
                    answer: (
                      <Style.GridInfoDescription>
                        <b
                          style={{
                            fontWeight: 400,
                            color: "black",
                            fontFamily: theme.fontFamily.primary,
                          }}
                        >
                          Owner
                        </b>
                        : {ShortenAddress(drip.owner)} {drip.owner === address ? "(You)" : ""}
                        <br />
                        <b
                          style={{
                            fontWeight: 400,
                            color: "black",
                            fontFamily: theme.fontFamily.primary,
                          }}
                        >
                          Status
                        </b>
                        : {dripStatus(drip.status)}
                      </Style.GridInfoDescription>
                    ),
                  },
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
        <Grid container spacing={4} alignItems="center">
          <Grid item>
            <Button
              onClick={() => {
                router.push(`/collectibles/drop/${drop.id}`);
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 5,
                }}
              >
                <TrendingFlatIcon style={{ transform: "rotate(180deg)" }} />
                <Style.ViewDrop>Drop</Style.ViewDrop>
              </div>
            </Button>
          </Grid>

          {drip && (
            <Grid item flexGrow={1}>
              {dripStatus(drip.status) === "DEFAULT" ? (
                <Button
                  isDisabled={drip.owner !== address}
                  onClick={() => {
                    set(1);
                  }}
                >
                  <Style.ButtonMint>SELECT YOUR NFT</Style.ButtonMint>
                </Button>
              ) : (
                <Button isDisabled={true} onClick={() => {}}>
                  <Style.ButtonMint>REDEEM</Style.ButtonMint>
                </Button>
              )}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Style.GridInfo>,
    //
    <Style.GridInfo
      container
      direction="column"
      justifyContent={"space-between"}
      alignItems={"space-between"}
      style={{ height: "100%" }}
    >
      <Grid item flexGrow={1}>
        <Style.HeaderLeftSide>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Style.StepTitle>SELECT YOUR NFT</Style.StepTitle>
            </Grid>
            <Grid item>
              <Button onClick={() => set(0)}>
                <CloseIcon style={{ height: "20px", width: "20px" }} />
              </Button>
            </Grid>
          </Grid>
        </Style.HeaderLeftSide>

        <Style.InnerLeftSide>
          {nfts &&
            nfts.map((collection, index1) => (
              <div key={index1} style={{ marginBottom: "20px" }}>
                <Style.CollectionName>{collection.collectionName}</Style.CollectionName>
                <ImageList cols={5} gap={4}>
                  {collection.assets.map((item, index) => (
                    <ImageListItem
                      key={index}
                      style={{
                        border:
                          selectedNFT &&
                          selectedNFT.name === collection.collectionName &&
                          selectedNFT.id === item.id
                            ? `1px solid ${theme.colors.black}`
                            : "1px solid transparent",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        updateItem(item);
                      }}
                    >
                      <img src={item.img} crossOrigin="anonymous" alt={"item.id"} loading="lazy" />
                    </ImageListItem>
                  ))}
                </ImageList>
              </div>
            ))}
        </Style.InnerLeftSide>
      </Grid>

      <Grid item flexShrink={0}>
        <Grid container direction="column" spacing={1.15}>
          <Grid item>
            {selectedNFT !== placeholderItem && (
              <Style.CurrentItem>
                * Your are mutating your Drip with {selectedNFT.symbol}#{selectedNFT.id}.
              </Style.CurrentItem>
            )}
          </Grid>

          <Grid item>
            <Button
              onClick={() => {
                mutate(drop.id, drip.id, selectedNFT.address, selectedNFT.id);
              }}
            >
              <Style.ButtonMint>MUTATE</Style.ButtonMint>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Style.GridInfo>,
  ];

  const [index, set] = useState(0);
  const onClick = () => set((state) => (state + 1) % 3);

  const transitions = useTransition(index, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <Style.Root>
      <Grid container>
        <Style.Grid3d item xs={8.5}>
          {drop && (
            <DropSceneLoader
              sceneRef={sceneRef}
              model={drop.metadata.model}
              versions={drop.metadata.versions}
              initialVersion={drip.version}
              initialPlaceholderTexture={drip.nft?.img || "/placeholder.png"}
              initialDropId={drop.id}
              initialDripId={drip.id}
              initialMaxSupply={drop.maxSupply}
            />
          )}
        </Style.Grid3d>

        <Style.GridInfoContainer item xs={3.5}>
          <div style={{ position: "relative", backgroundColor: "red", width: "100%" }}>
            {transitions((style, item) => (
              <animated.div style={style as any}>{a[item]}</animated.div>
            ))}
          </div>
        </Style.GridInfoContainer>
      </Grid>
    </Style.Root>
  );
}
