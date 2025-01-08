import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextBlock from "./TextBlock";
import { Grid } from "@mui/material";
import { NormalCard } from "../components/Cards";
import { Height } from "@mui/icons-material";

function ReviewerViewer(props) {
    const {
        payload,
    } = props;

    // Extract title and abstract using regex
    // The text looks like Title: xxx Abstract: xxx
    let review_regex = /Review: (.*)/s;
    let review = payload.meta.review.match(review_regex)[1];

    return <NormalCard sx={{
        margin: "30px",
        maxHeight: "30vh",
        overflow: "auto"
    }}>
        <TextBlock prefix="Review:" text={review} />
    </NormalCard>
}

export default ReviewerViewer;