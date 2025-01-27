import { useRef, useState } from "react";
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import SelectableTextBlock from "./SelectableTextBlock";
import { Grid } from "@mui/material";
import { NormalCard } from "../components/Cards";
import { findSubArray } from "../components/utils";
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
    let review = payload.meta.review.replace(/\s+/g, ' ');
    review = review.match(review_regex)[1];
    const reviewTokens = review.split(/\s+/);
    if (hoverWeakness != -1 && hoverWeakness < payload.response["Weakness associated with claims"].length) {
        console.log(payload.response["Weakness associated with claims"][hoverWeakness]['Weakness span']);
    }

    const selection = (hoverWeakness == -1 || hoverWeakness >= payload.response["Weakness associated with claims"].length)
        ? null
        : payload.response["Weakness associated with claims"][hoverWeakness]['Weakness span'].replace(/\s+/g, ' ');
    const selectionTokens = selection !== null
        ? selection.split(/s+/)
        : [];
    const selectionIndices = findSubArray(reviewTokens, selectionTokens);
    // SelectableTextBlock.selectedTokenSpan end index is inclusive
    const [selectedTokenSpan, setSelectedTokenSpan] = useState(
        selectionIndices
        ? [selectionIndices[0], selectionIndices[1] - 1]
        : null
    );

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
            <SelectableTextBlock prefix="Review: " tokens={reviewTokens} selectedTokenSpan={selectedTokenSpan} onSelect={(span, tokens, text) => setSelectedTokenSpan(span)} parentRef={parentRef} bColor={
                (hoverWeakness == -1 || hoverWeakness >= payload.response["Weakness associated with claims"].length) ? theme.palette["card-bg-emph"].main : candidateColorList[hoverWeakness % candidateColorList.length]
            } />
        </Box>
    </NormalCard>
}

export default ReviewerViewer;