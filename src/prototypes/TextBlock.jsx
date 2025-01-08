import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

function TextBlock(props) {

    const {
        prefix,
        text
    } = props;

    return (
        <Box>
            <Typography variant="body1">
                <b>{prefix}</b> {text}
            </Typography>
        </Box>
    );
}

export default TextBlock;