import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Container, Paper, Button } from '@mui/material';

function TextHighlighter(props) {
    const {
        text,
        bColor,
        highlight,
        setHighlight,
        targetRef,
    } = props;

    const contentRef = useRef(null);

    const clearHighlight = () => {
        const spans = contentRef.current.querySelectorAll("span");
        spans.forEach((span) => {
            const parent = span.parentNode;
            while (span.firstChild) {
                parent.insertBefore(span.firstChild, span);
            }
            parent.removeChild(span);
        });
    };

    const handleMouseUp = () => {
        const selection = window.getSelection();
        if (
            selection &&
            selection.toString().trim() !== "" &&
            contentRef.current.contains(selection.anchorNode)
        ) {
            const range = selection.getRangeAt(0);
            const selectedText = selection.toString();

            // Calculate absolute offsets
            const preSelectionRange = document.createRange();
            preSelectionRange.selectNodeContents(contentRef.current);
            preSelectionRange.setEnd(range.startContainer, range.startOffset);
            const startOffset = preSelectionRange.toString().length;
            const endOffset = startOffset + selectedText.length;

            // Clear previous highlights
            // clearHighlight();

            // Highlight the selected text
            // const span = document.createElement("span");
            // span.style.backgroundColor = bColor;
            // span.appendChild(range.extractContents());
            // range.insertNode(span);


            // Save the highlight information
            setHighlight({
                text: selectedText,
                startOffset,
                endOffset,
            });

            // Clear the selection
            selection.removeAllRanges();
        }
    };

    if (highlight != null) {
        const { startOffset, endOffset } = highlight;
        const highlightedText = text.slice(startOffset, endOffset);
        const parts = [
            text.slice(0, startOffset),
            highlightedText,
            text.slice(endOffset),
        ];

        return (
            <Box
                onMouseDown={() => {
                    // Allow users to start a new selection without prematurely clearing existing highlights
                }}
                onMouseUp={handleMouseUp}
                ref={contentRef}
                sx={{ lineHeight: 1.8, color: 'text.primary' }}>
                    {parts.map((part, index) => (
                        <Typography
                            key={index}
                            component="span"
                            sx={{
                                backgroundColor: index == 1 ? bColor : 'transparent',
                            }}
                        >
                            {part}
                        </Typography>
                    ))}
            </Box>
        )
    };

    return (
        <Box
            onMouseDown={() => {
                // Allow users to start a new selection without prematurely clearing existing highlights
            }}
            onMouseUp={handleMouseUp}
            ref={contentRef}
            sx={{ lineHeight: 1.8, color: 'text.primary' }}>
                {text}
        </Box> 
    )

};

export default TextHighlighter;