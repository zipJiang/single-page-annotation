import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import { EmphCard } from '../components/Cards';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import TextBlock from './TextBlock';
import { InputLabel, Menu } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


const candidateColorList = [
    "#F94144",
    "#F3722C",
    "#F8961E",
    "#F9844A",
    "#F9C74F",
    "#90BE6D",
    "#43AA8B",
    "#4D908E",
    "#577590",
    "#277DA1",
]


function ClaimAnnotation(props) {

    const {
        payload,
        claimType,
        claimIndex,
        setClaimIndex,
        setClaimType,
        weaknessSelection,
        setHoverWeakness
    } = props;

    let claim_regex = /claim\d+: (.*)/si;
    let claim = payload.meta.claims[claimIndex].match(claim_regex)[1];

    return (
        <EmphCard sx={{
            margin: "10px"
        }}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Box sx={{
                        padding: "10px",
                    }}>
                        <FormControl sx={{
                            width: "80%",
                        }}>
                            <InputLabel
                                id={"claim" + claimIndex + "TypeLabel"}
                            >
                                Type
                            </InputLabel>
                            <Select
                                inputProps={{ 'aria-label': 'Without label' }}
                                labelId={"claim" + claimIndex + "TypeLabel"}
                                label="Type"
                                id={"claim" + claimIndex + "TypeLabel-Select"}
                                value={claimType}
                                onChange={(event) => {
                                    setClaimType(event.target.value);
                                }}
                            >
                                <MenuItem value={1}>Descriptive</MenuItem>
                                <MenuItem value={2}>Interpretive</MenuItem>
                                <MenuItem value={3}>Overarching</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box sx={{
                        padding: "10px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                    }}>
                        <Box sx={{
                            order: 1,
                            transform: "translateY(10px)",
                        }}>
                            <Button id="previous-button" variant="contained" onClick={() => {
                                setClaimIndex(claimIndex - 1);
                                setHoverWeakness(-1);
                            }}
                                disabled={claimIndex === 0}
                            >
                                Prev
                            </Button>
                        </Box>
                        <Box sx={{
                            order: 2,
                            transform: "translateY(10px)",
                        }}>
                            <Button id="next-button" variant="contained" onClick={() => {
                                setHoverWeakness(-1);
                                setClaimIndex(claimIndex + 1);
                            }}
                            >
                                Next
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Box sx={{
                height: "50px",
            }}>
                {weaknessSelection.map((weakness, index) => {
                    if (!weakness.selected) {
                        return null;
                    }
                    return (
                        <Chip
                            key={"claim" + claimIndex + "weakness" + index}
                            label={"W" + (index + 1) + " C:" + weakness.uncertainty + " S:" + weakness.subjectivity}
                            variant="filled"
                            sx={{
                                backgroundColor: candidateColorList[(4 * index) % candidateColorList.length],
                                margin: "5px",
                            }}
                        />
                    );
                })}
            </Box>
            <TextBlock prefix={"Claim " + (claimIndex + 1) + ": "} text={claim} />
        </EmphCard>
    );
}

export default ClaimAnnotation;