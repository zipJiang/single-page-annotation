import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

function TextBlock(props) {
    const { blockId, sentences, currentReading, forwardRef } = props;

    return (
        <div ref={forwardRef}>
            {sentences.map((sentence, index) => <Typography key={`rendered-b${blockId}-s${index}`} component="div" variant={currentReading ? "reading" : "prevRead"} sx={{ backgroundColor: currentReading && sentence.highlight ? "#e3e3e3": null }} >{sentence.content}</Typography>)}
        </div>
    );
}

export default TextBlock;