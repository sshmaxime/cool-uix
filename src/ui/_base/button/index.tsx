import { FC, useState } from "react";
import Style from "./style";
import { animated, useSpring } from "@react-spring/web";

const Button: FC<{
  children: React.ReactNode;
  onClick: Function;
  isDisabled?: boolean;
  animate?: boolean;
  inline?: boolean;
}> = ({ children, onClick, isDisabled = false, animate = false, inline = false }) => {
  const [hover, setHover] = useState(false);

  const spring = useSpring({
    from: { opacity: "0" },
    to: {
      opacity: hover ? "1" : "0",
      width: hover ? "100%" : "0%",
    },
  });

  return (
    <Style.Root
      inline={inline}
      animate={animate}
      isDisabled={isDisabled}
      onClick={() => onClick()}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
      {animate && <animated.div style={{ ...spring, height: "1px", backgroundColor: "black" }} />}
    </Style.Root>
  );
};

export default Button;
