import { Portal, useTheme } from "@mui/material";
import { animated, useSpring } from "@react-spring/web";
import { useRouter } from "next/router";
import { MouseEventHandler, useState } from "react";
import Style from "./style";
import { Button } from "@/ui/index";

export const NavbarButton = (props: {
  title: string;
  onClick: Function;
  onMouseEnter?: Function;
  onMouseLeave?: Function;
}) => {
  const [toggle, setToggle] = useState(false);
  const theme = useTheme();
  const router = useRouter();

  const isRoute = router.pathname.includes(props.title);

  const springs = useSpring({
    from: { opacity: "0" },
    to: {
      opacity: isRoute || toggle ? "1" : "0",
      width: isRoute || toggle ? "100%" : "0%",
    },
  });

  return (
    <>
      <Style.NavbarElemContainer
        item
        onMouseEnter={() => {
          setToggle(true);
          props.onMouseEnter?.();
        }}
        onMouseLeave={() => {
          setToggle(false);
          props.onMouseLeave?.();
        }}
        onClick={() => props.onClick()}
      >
        <Style.NavbarElem>
          {props.title}
          <animated.div style={{ ...springs, height: "1px", backgroundColor: "black" }} />
        </Style.NavbarElem>
      </Style.NavbarElemContainer>
    </>
  );
};
