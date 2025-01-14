import { useRef } from "react";
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import TextBlock from "./TextBlock";
import { Grid } from "@mui/material";
import { NormalCard } from "../components/Cards";
import { Height } from "@mui/icons-material";
import { candidateColorList } from "./ckp";


function ReviewerViewer(props) {
    const {
        theme,
        payload,
        hoverWeakness,
    } = props;

    const parentRef = useRef(null);

    // Extract title and abstract using regex
    // The text looks like Title: xxx Abstract: xxx
    let review_regex = /Review: (.*)/s;
    let review = payload.meta.review.match(review_regex)[1];

    return <NormalCard sx={{
        margin: "30px",
        height: "300px",
    }}>
        <Box sx={{
            height: "100%",
            overflow: "auto",
        }}
            ref={parentRef}
        >
            <TextBlock prefix="Review: " text={review} selection={
                (hoverWeakness == -1 || hoverWeakness >= payload.response["Weakness associated with claims"].length) ? null : payload.response["Weakness associated with claims"][hoverWeakness]['Weakness span']
            } parentRef={parentRef} bColor={
                (hoverWeakness == -1 || hoverWeakness >= payload.response["Weakness associated with claims"].length) ? theme.palette["card-bg-emph"].main : candidateColorList[hoverWeakness % candidateColorList.length]
            } />
        </Box>
    </NormalCard>
}

export default ReviewerViewer;