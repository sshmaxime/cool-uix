import { FC, Fragment } from "react";

// styles
import Style from "./style";

import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useTheme } from "@mui/material/styles";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Faq: FC<{
  content: {
    question: any;
    answer: any;
  }[];
}> = ({ content }) => {
  const theme = useTheme();

  return (
    <Style.Root>
      {content.map((item, index) => (
        <Fragment key={index}>
          <Style.Accordion defaultExpanded={index === 0}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ paddingLeft: "0px" }}>
              <div
                style={{
                  fontSize: "0.9em",
                  fontWeight: 500,
                  fontFamily: theme.fontFamily.primary,
                }}
              >
                {item.question}
              </div>
            </AccordionSummary>
            <AccordionDetails style={{ marginTop: "15px", marginLeft: "2.5px", padding: "0px" }}>
              {item.answer}
            </AccordionDetails>
          </Style.Accordion>
          <div style={{ height: "1px", backgroundColor: theme.colors.secondary }}></div>
        </Fragment>
      ))}
    </Style.Root>
  );
};

export default Faq;
