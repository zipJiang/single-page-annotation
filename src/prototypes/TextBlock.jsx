import { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import { Typography } from "@mui/material";
import TextHighlighter from "./TextHighlighter";

function TextBlock(props) {

    const {
        prefix,
        text,
        selection,
        setSelection,
        bColor = null,
        variant = "body1",
        parentRef = null,
    } = props;

    const targetRef = useRef(null);

    useEffect(() => {
        if (targetRef.current) {
            // only scroll if parentRef is scrollable
            const isScrollable = parentRef && parentRef.current.scrollHeight > parentRef.current.clientHeight;
            if (isScrollable) {
                targetRef.current.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
            };
        }
    }, [selection]);

    return (
        <Box>
            <TextHighlighter 
                text={text}
                bColor={bColor}
                highlight={selection}
                setHighlight={setSelection}
                targetRef={targetRef}
            />
        </Box>
    );
}

export default TextBlock;