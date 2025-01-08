import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextBlock from "./TextBlock";
import { NormalCard } from "../components/Cards";
import { Height } from "@mui/icons-material";

function AbstractViewer(props) {
    const {
        payload,
    } = props;

    // Extract title and abstract using regex
    // The text looks like Title: xxx Abstract: xxx

    let title_regex = /Title: (.*)\n/;
    let abstract_regex = /Abstract: (.*)/s;

    let title = payload.meta.title.match(title_regex)[1];
    let abstract = payload.meta.title.match(abstract_regex)[1];

    return <NormalCard sx={{
        margin: "30px",
        maxHeight: "80vh",
        overflow: "auto"
    }}>
        <Typography variant="h4">
            {title}
        </Typography>
        <br />
        <TextBlock prefix="Abstract:" text={abstract} />
    </NormalCard>
}

export default AbstractViewer;