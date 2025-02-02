import { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import { Typography } from "@mui/material";

function TextBlock(props) {

    const {
        prefix,
        text,
        selection,
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

    const Highlight = styled("span")(({ theme }) => ({
        backgroundColor: bColor,
        color: theme.palette.text.primary,
        padding: "0 4px", // Add padding for better readability
        borderRadius: "4px",
      }));

    const HighlightText = ({ text, selection }) => {
        if (!selection) {
            return <Typography variant={variant} component={"div"}>
                <b>{prefix}</b>
                {text}
            </Typography>;
        }
      
        // Split the text into three parts: before, the match, and after
        // const parts = text.split(selection);
        let [startOffset, endOffset] = selection;

        const parts = [
            text.substring(0, startOffset),
            text.substring(startOffset, endOffset),
            text.substring(endOffset)
        ];

        // console.log(parts);
      
        return (
            <Typography variant={variant} component={"div"}>
                <b>{prefix}</b>
                {parts[0]}
                <Highlight 
                    ref={targetRef}
                    id="highlighted-review"
                >{parts[1]}</Highlight>
                {parts[2]}
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