import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

function TextBlock(props) {
    const { blockId, sentences, currentReading, forwardRef, highlightColor } = props;

    return (
        <div ref={forwardRef}>
            {sentences.map((sentence, index) => <Typography key={`rendered-b${blockId}-s${index}`} component="div" variant={currentReading ? "reading" : "prevRead"} sx={{ backgroundColor: currentReading && sentence.highlight ? highlightColor: null }} >{sentence.content}</Typography>)}
        </div>
    );
}

export default TextBlock;