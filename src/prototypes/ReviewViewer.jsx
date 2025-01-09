import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
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
        height: "340px",
    }}>
        <Box sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "baseline",
        }}>
            <Box sx={{
                order: 1,
                width: "48%",
                height: "300px",
                overflow: "auto"
            }}>
                <TextBlock prefix="Review: " text={review} selection={payload.response['Weakness span']} />
            </Box>
            <Divider orientation="vertical" flexItem sx={{order: 2}} />
            <Box sx={{
                order: 3,
                width: "48%",
                height: "300px",
                overflow: "auto"
            }}>
                <TextBlock prefix="GPT-Reasoning: " text={payload.response.Reasoning} />
                <TextBlock prefix="GPT-Label: " text={payload.response.Label} />
                <TextBlock prefix="GPT-Highlight: " text={payload.response['Weakness span']} />
            </Box>
        </Box>
    </NormalCard>
}

export default ReviewerViewer;