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
        focusIndex,
        backgroundColors,
        selections,
        setSelections,
    } = props;

    const parentRef = useRef(null);

    // Extract title and abstract using regex
    // The text looks like Title: xxx Abstract: xxx
    let review_regex = /Review: (.*)/s;
    let review = payload.meta.review.replace(/\s+/g, ' ');
    review = review.match(review_regex)[1];

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
            <Typography sx={{
                color: "grey"
            }}>
                <i>Please highlight the text that is relevant to the weakness below.</i>
            </Typography>
            <br />
            <TextBlock prefix="Review: " text={review} selection={
                focusIndex == -1 ? null : selections[focusIndex]
            } parentRef={parentRef} bColor={
                focusIndex == -1 ? null : backgroundColors[focusIndex]
            } setSelection={(selection) => {
                const newSelections = [...selections];
                newSelections[focusIndex] = selection;
                setSelections(newSelections);
            }}
            />
        </Box>
    </NormalCard>
}

export default ReviewerViewer;