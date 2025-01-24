import React from 'react';
import { useState, useEffect } from 'react';
import { NormalCard } from '../components/Cards';
import Box from '@mui/material/Box';
import SentenceElement from './SentenceElement';
import { Maximize, Padding } from '@mui/icons-material';
import { Typography } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

function SentenceSelection(props) {

    const {
        sentSelectIndices,
        setSentSelectIndices,
        highlighting,
        threshold,
        payload,
        theme,
    } = props;

    const getSetForIndex = (index) => {
        const setForIndex = (value) => {
            const newIndices = [...sentSelectIndices];
            newIndices[index] = value;
            setSentSelectIndices(newIndices);
        }

        return setForIndex;
    }
    const [snackOpen, setSnackOpen] = React.useState(false);
    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={() => setSnackOpen(false)}>
                DISMISS
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={(event, reason) => setSnackOpen(false)}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
            </React.Fragment>
      );


    return (
        <NormalCard sx={{
            margin: "20px",
        }}>
            <Snackbar
                open={snackOpen}
                autoHideDuration={6000}
                message={"You can only select 3 sentences."}
                onClose={(event, reason) => {}}
                action={action}
            />
            <Box sx={{
                maxHeight: "90vh",
                overflow: "auto",
            }}>
                {payload['source-text'].map((sentence, index) => {
                    return (<SentenceElement 
                        sentence={sentence}
                        index={index}
                        key={"sentence-" + index}
                        setSentSelect={getSetForIndex(index)}
                        sentSelect={sentSelectIndices[index]}
                        highlighting={highlighting[index]}
                        disableFurtherSelection={sentSelectIndices.filter((value) => value).length >= 3}
                        setSnackOpen={setSnackOpen}
                        theme={theme}
                    />);
                })}
            </Box>
        </NormalCard>
    )
}

export default SentenceSelection;