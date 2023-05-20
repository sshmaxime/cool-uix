import { ShortenAddress } from "@/utils/index";
import { CircularProgress } from "@mui/material";
import { ConnectButton as RainbowConnectButton } from "@rainbow-me/rainbowkit";
import { NavbarButton } from "./button";
import Style from "./style";
import Wallet from "./wallet";
import { wagmiClient } from "pages/_app";
import { useEffect } from "react";

export default function ConnectButton() {
  useEffect(() => {
    wagmiClient.autoConnect();
  }, []);

  return (
    <RainbowConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
        ...props
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return <NavbarButton title="connect" onClick={openConnectModal} />;
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }

              return (
                <div style={{ display: "flex", gap: 15, alignItems: "center" }}>
                  {account.hasPendingTransactions && (
                    <CircularProgress
                      onClick={openAccountModal}
                      style={{
                        height: "15px",
                        width: "15px",
                        cursor: "pointer",
                        color: "black",
                      }}
                    />
                  )}

                  <Style.NavbarAccount onClick={openAccountModal}>
                    {ShortenAddress(account.displayName)}
                  </Style.NavbarAccount>

                  <Wallet address={account?.address} />

                  {/* {account.displayBalance ? ` (${account.displayBalance})` : ""} */}
                </div>
              );
            })()}
          </div>
        );
      }}
    </RainbowConnectButton.Custom>
  );
}
