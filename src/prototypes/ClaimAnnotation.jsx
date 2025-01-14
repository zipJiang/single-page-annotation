import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import { EmphCard } from '../components/Cards';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import TextBlock from './TextBlock';
import { Divider, InputLabel, Menu, Stack, Typography } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { candidateColorList } from './ckp';


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
            <Box>
                <Box sx={{
                    padding: "10px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                }}>
                    <Box sx={{
                        order: 1,
                        // transform: "translateY(10px)",
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
                        // transform: "translateY(10px)",
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
            </Box>
            <TextBlock prefix={"Claim " + (claimIndex + 1) + ": "} text={claim} />
            <Divider>
                <Chip label="Annotation" />
            </Divider>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Box>
                        <Box>
                            <Box sx={{
                                padding: "10px",
                            }}>
                                {["Descriptive", "Interpretive", "Related Work"].map((type, index) => {
                                    return (
                                        <FormControl key={"claim" + claimIndex + "type" + index}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={claimType[type]}
                                                        onChange={() => {
                                                            let newClaimType = { ...claimType };
                                                            newClaimType[type] = !newClaimType[type];
                                                            setClaimType(newClaimType);
                                                        }}
                                                    />
                                                }
                                                label={type}
                                            />
                                        </FormControl>
                                    )
                                })}
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box sx={{}}>
                        {weaknessSelection.map((weakness, index) => {
                            if (!weakness.selected) {
                                return null;
                            }
                            return (
                                <Chip
                                    key={"claim" + claimIndex + "weakness" + index}
                                    label={"W" + (index + 1)}
                                    variant="filled"
                                    sx={{
                                        backgroundColor: candidateColorList[index % candidateColorList.length],
                                        margin: "5px",
                                        fontSize: "10px"
                                    }}
                                />
                            );
                        })}
                    </Box>
                </Grid>
            </Grid>
        </EmphCard>
    );
}

export default ClaimAnnotation;