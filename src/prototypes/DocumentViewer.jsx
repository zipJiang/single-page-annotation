import { Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import TextBlock from "./TextBlock";
import { NormalCard } from "../components/Cards";

function DocumentViewer(props) {
    const { currentBlockId, payload, disabled = false } = props;
    const blocks = payload['blocks'];

    const currentReadingRef = useRef(null);
    useEffect(() => {
        // Scroll to the current reading block.
        // while (currentReadingRef.current === null) {
        //     // Wait until the currentReadingRef is set.
        // };
        if (currentReadingRef.current !== null && !disabled)
            currentReadingRef.current.scrollIntoView({behavior: "smooth"});
    }, [currentBlockId, currentReadingRef]);

    // Notice that we only render the blocks up to the currentBlockId.
    return (
        <Box sx={{padding: "10px"}}>
            <NormalCard>
                <Typography variant="h6" component="div">
                    Document
                </Typography>
                <Box sx={{width: "100%", height: "380px", overflow: "auto"}}>
                    {blocks.slice(0, currentBlockId + 1).map((block, index) => <TextBlock
                        key={`rendered-block-b${index}`}
                        blockId={index}
                        sentences={block}
                        currentReading={currentBlockId === index}
                        forwardRef={currentBlockId === index ? currentReadingRef : null} 
                    />)}
                </Box>
            </NormalCard>
        </Box>
    );
}

export default DocumentViewer;