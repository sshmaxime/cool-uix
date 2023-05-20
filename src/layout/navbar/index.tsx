import { PremierLogo } from "@/assets/index";
import { Grid, Theme, useTheme } from "@mui/material";
import { animated, useSpring, useTransition } from "@react-spring/web";
import debounce from "lodash.debounce";
import { useRouter } from "next/router";
import { useState } from "react";
import { NavbarButton } from "./button";
import ConnectButton from "./connect";
import Style from "./style";
import { Button } from "@/ui/index";

const NavbarRoutes: {
  [routeName: string]: {
    routeName: string;
    endpoint: string;
    menu?: {
      title: string;
      links?: { title: string; endpoint: string }[];
    }[];
  };
} = {
  ["collectibles"]: {
    routeName: "collectibles",
    endpoint: "/collectibles",
    menu: [
      {
        title: "Original",
        links: [{ title: "Genesis", endpoint: "https://google.com" }],
      },
      {
        title: "Drop",
        links: [{ title: "#0 - Virgin Skateboard", endpoint: "https://google.com" }],
      },
      {
        title: "PremierX",
        links: [{ title: "Mas Magnan", endpoint: "https://google.com" }],
      },
      {
        title: "Help",
        links: [{ title: "Apha", endpoint: "https://google.com" }],
      },
    ],
  },

  ["events"]: {
    routeName: "events",
    endpoint: "/events",
  },

  ["magazine"]: { routeName: "magazine", endpoint: "/magazine" },
};
const NavbarRoutesAsArray = Object.values(NavbarRoutes);

export default function Navbar() {
  const router = useRouter();
  const theme = useTheme();

  const [activeRoute, setActiveRoute] = useState("");

  const setRoutes = (routeName: string) => {
    setActiveRoute(routeName);
  };

  const spring = useSpring({
    from: {
      position: "fixed" as const,
      top: "-500px",
      width: "100vw",
      borderTop: `1px solid ${theme.colors.secondary}`,
    },
    to: {
      top: activeRoute !== "" && NavbarRoutes[activeRoute].menu ? theme.header.height : "-500px",
    },
    delay: 350,
  });

  let debounce_: any;

  const transitions = useTransition(activeRoute, {
    from: { opacity: 0.5 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    delay: 350,
  });

  const spring2 = useSpring({
    from: {
      opacity: 0,
      transform: "translate(0px, -30px)",
    },
    to: {
      opacity: activeRoute !== "" && NavbarRoutes[activeRoute].menu ? 1 : 0,
      transform:
        activeRoute !== "" && NavbarRoutes[activeRoute].menu
          ? "translate(0px, 0%)"
          : "translate(0px, -30px)",
    },
    delay: 500,
  });

  const spring3 = useSpring({
    from: {
      opacity: 0,
      transform: "translate(0px, -30px)",
    },
    to: {
      opacity: activeRoute !== "" && NavbarRoutes[activeRoute].menu ? 1 : 0,
      transform:
        activeRoute !== "" && NavbarRoutes[activeRoute].menu
          ? "translate(0px, 0%)"
          : "translate(0px, -30px)",
    },
    delay: 500,
  });

  return (
    <>
      <animated.div
        style={{ ...spring }}
        onMouseEnter={() => {
          debounce_?.cancel();
        }}
        onMouseLeave={() => {
          setRoutes("");
        }}
      >
        {transitions(
          (style, item) =>
            NavbarRoutes[item] && (
              <animated.div style={style as any}>
                <div
                  style={{
                    position: "absolute",
                    width: "100%",
                  }}
                >
                  <Grid container justifyContent="space-between">
                    {NavbarRoutes[item].menu?.map((menuItem, index) => (
                      <Grid
                        item
                        flexGrow={1}
                        style={{
                          backgroundColor:
                            index % 2 === 0 ? theme.colors.primary : theme.colors.tertiary,
                        }}
                      >
                        <div
                          style={{
                            ...theme.myBreakpoints.app,
                            boxSizing: "border-box",
                            paddingTop: "35px",
                            paddingBottom: "25px",
                          }}
                        >
                          <animated.div style={spring3}>
                            <div
                              style={{
                                fontFamily: theme.fontFamily.secondary,
                                fontSize: "0.9em",
                                marginBottom: "25px",
                              }}
                            >
                              {menuItem.title}
                            </div>
                          </animated.div>

                          <div>
                            {menuItem.links &&
                              menuItem.links?.map((link) => (
                                <animated.div style={spring2}>
                                  <Button animate inline onClick={() => router.push(link.endpoint)}>
                                    <div
                                      style={{
                                        fontFamily: theme.fontFamily.primary,
                                        fontSize: "0.9em",
                                      }}
                                    >
                                      {link.title}
                                    </div>
                                  </Button>
                                </animated.div>
                              ))}
                          </div>
                        </div>
                      </Grid>
                    ))}
                  </Grid>
                </div>
              </animated.div>
            )
        )}
      </animated.div>
      <Style.Root>
        <Style.Navbar container alignItems="center" justifyContent="space-between">
          <Grid item xs={3} style={{ display: "flex", alignItems: "center" }}>
            <PremierLogo
              style={{ width: "150px", cursor: "pointer" }}
              onClick={() => router.push("/")}
            />
          </Grid>

          <Grid item flexGrow={1} style={{ height: "100%" }}>
            <Grid container justifyContent="center" style={{ height: "100%" }}>
              {NavbarRoutesAsArray.map((route) => (
                <NavbarButton
                  key={route.routeName}
                  title={route.routeName}
                  onClick={() => router.push(route.endpoint)}
                  onMouseEnter={() => {
                    setRoutes(route.routeName);
                    debounce_?.cancel();
                  }}
                  onMouseLeave={() => {
                    debounce_ = debounce(() => setRoutes(""), 500);
                    debounce_();
                  }}
                />
              ))}
            </Grid>
          </Grid>

          <Grid item xs={3}>
            <Grid container justifyContent="end">
              <Grid item>
                <ConnectButton />
              </Grid>
            </Grid>
          </Grid>
        </Style.Navbar>
      </Style.Root>
    </>
  );
}
