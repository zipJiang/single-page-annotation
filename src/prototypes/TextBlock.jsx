import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import { Typography } from "@mui/material";

function TextBlock(props) {

    const {
        prefix,
        text,
        selection
    } = props;

    const Highlight = styled("span")(({ theme }) => ({
        backgroundColor: theme.palette["card-bg-emph"].main,
        color: theme.palette.text.primary,
        padding: "0 4px", // Add padding for better readability
        borderRadius: "4px",
      }));

    const HighlightText = ({ text, selection }) => {
        if (!selection || !text.includes(selection)) {
            return <Typography variant="body1" component={"div"}>
                <b>{prefix}</b>
                {text}
            </Typography>;
        }
      
        // Split the text into three parts: before, the match, and after
        const parts = text.split(selection);
      
        return (
            <Typography variant="body1" component={"div"}>
                <b>{prefix}</b>
                {parts[0]}
                <Highlight>{selection}</Highlight>
                {parts[1]}
            </Typography>
        );
    };

    return (
        <Box>
            <HighlightText text={text} selection={selection} />
        </Box>
    );
}

export default TextBlock;