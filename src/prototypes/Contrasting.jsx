import { Typography } from '@mui/material';
import React from 'react';

function Contrasting(props) {
    const {
        original,
        edited
    } = props;

    const tokenizedOriginal = original.split(" ");
    const tokenizedEdited = edited.split(" ");

    const minimumEditingMatches = (original, edited) => {
        // Return the editing positions (LCS matching)
        let matches = []
        const originalLength = original.length;
        const editedLength = edited.length;
        const dp = new Array(originalLength + 1).fill(0).map(() => new Array(editedLength + 1).fill(0));

        for (let i = 1; i <= originalLength; i++) {
            for (let j = 1; j <= editedLength; j++) {
                if (original[i - 1] === edited[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }

        // Backtrack to get the matches
        let i = originalLength;
        let j = editedLength;
        while (i > 0 && j > 0) {
            if (original[i - 1] === edited[j - 1]) {
                matches.push([i - 1, j - 1]);
                i--;
                j--;
            } else if (dp[i - 1][j] > dp[i][j - 1]) {
                i--;
            } else {
                j--;
            }
        }

        matches = matches.reverse();

        // group contiguous matches
        const groupedMatches = new Array();
        let currentGroup = new Array();
        let prevOriginal = -1;
        let prevEdited = -1;

        for (let i = 0; i < matches.length; i++) {
            const [originalIndex, editedIndex] = matches[i];
            if (originalIndex === prevOriginal + 1 && editedIndex === prevEdited + 1) {
                currentGroup.push([originalIndex, editedIndex]);
            } else {
                if (currentGroup.length > 0) {
                    groupedMatches.push(currentGroup);
                }
                currentGroup = [[originalIndex, editedIndex]];
            }
            prevOriginal = originalIndex;
            prevEdited = editedIndex;
        }

        if (currentGroup.length > 0) {
            groupedMatches.push(currentGroup);
        }

        return groupedMatches;
    }

    const matched = minimumEditingMatches(tokenizedOriginal, tokenizedEdited);
    const componentsToDisplay = new Array();

    let prevOriginal = 0;
    let prevEdited = 0;

    for (let i = 0; i < matched.length; i++) {
        // const [originalIndex, editedIndex] = matched[i];
        const currentGroup = matched[i];
        const originalSlice = tokenizedOriginal.slice(prevOriginal, currentGroup[0][0]).join(" ");
        const editedSlice = tokenizedEdited.slice(prevEdited, currentGroup[0][1]).join(" ");
        // const matchedSlice = original.slice(currentGroup[0][0], currentGroup[currentGroup.length - 1][0] + 1);
        const matchedSlice = tokenizedOriginal.slice(currentGroup[0][0], currentGroup[currentGroup.length - 1][0] + 1).join(" ");

        componentsToDisplay.push(
            <Typography variant='editedOut'>
                {originalSlice}
            </Typography>
        );
        componentsToDisplay.push(
            <Typography variant='editedIn'>
                {editedSlice}
            </Typography>
        );
        componentsToDisplay.push(
            <Typography variant='prompt'>
                {matchedSlice}
            </Typography>
        );

        prevOriginal = currentGroup[currentGroup.length - 1][0] + 1;
        prevEdited = currentGroup[currentGroup.length - 1][1] + 1;
    }

    if (prevOriginal < tokenizedOriginal.length) {
        const originalSlice = tokenizedOriginal.slice(prevOriginal, tokenizedOriginal.length).join(" ");
        componentsToDisplay.push(
            <Typography variant='editedOut'>
                {originalSlice}
            </Typography>
        );
    }
    if (prevEdited < tokenizedEdited.length) {
        const editedSlice = tokenizedEdited.slice(prevEdited, tokenizedEdited.length).join(" ");
        componentsToDisplay.push(
            <Typography variant='editedIn'>
                {editedSlice}
            </Typography>
        );
    }

    return (
        <Typography variant='prompt' component="span">
            {/* {componentsToDisplay} */}
            {componentsToDisplay.map((component, cidx) => {
                return (
                    <span key={"component-" + cidx}>
                        {cidx > 0 ? " " : ""}{component}
                    </span>
                )
            })}
        </Typography>
    )
}

export default Contrasting;