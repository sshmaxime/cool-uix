import localFont from "next/font/local";

// Icons
import IconEth from "./icons/iconEth.svg";
import IconEtherscan from "./icons/iconEtherscan.svg";
import IconOpensea from "./icons/iconOpensea.svg";

// Images
import PremierLogo from "./images/premier.svg";
import StoreImg from "./images/store.png";

// Fonts
const calibreFont = localFont({
  src: [
    {
      path: "../assets/fonts/calibre-light.woff2",
      weight: "300",
    },
    {
      path: "../assets/fonts/calibre-regular.woff2",
      weight: "400",
    },
    {
      path: "../assets/fonts/calibre-medium.woff2",
      weight: "500",
    },
    {
      path: "../assets/fonts/calibre-semibold.woff2",
      weight: "600",
    },
    {
      path: "../assets/fonts/calibre-bold.woff2",
      weight: "700",
    },
    {
      path: "../assets/fonts/calibre-black.woff2",
      weight: "900",
    },
  ],
});

const wideFont = localFont({
  src: [
    {
      path: "../assets/fonts/wide.ttf",
      weight: "300",
    },
  ],
});

export {
  // Icons
  IconEtherscan,
  IconOpensea,
  IconEth,
  // Images
  PremierLogo,
  StoreImg,
  // Fonts
  calibreFont,
  wideFont,
};
