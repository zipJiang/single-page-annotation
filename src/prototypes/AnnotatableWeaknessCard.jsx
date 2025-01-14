import "./AnnotatableWeaknessCard.css";
import React, { useEffect } from 'react';
import TextField from "@mui/material/TextField";
import SecondaryClaimSelection from "./SecondaryClaimSelection";
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import TextBlock from "./TextBlock";
import { Divider } from "@mui/material";
import { NormalCard } from '../components/Cards';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { candidateColorList } from "./ckp";

const displayWeaknessTypeConversion = {
    "insufficient": "Insufficient Evidence",
    "contradictory": "Contradicting Evidence",
    "novelty": "Novelty",
    "clarity": "Clarity",
    "related_work": "Related Work",
    "other": "Other"
}


function AnnotatableWeaknessCard(props) {

    const {
        payload,
        theme,
        index,
        setClaimIndex,
        weakness,
        weaknessSelection,
        setHoverWeakness,
        setWeaknessSelectionForIndex,
        setWeaknessIndex,
        weaknessBad,
        setWeaknessBad,
        weaknessComment,
        setWeaknessComment,
        bandHeight,
        weaknessTypeAnnotation,
        setWeaknessTypeAnnotation,
        secondarySelection,
        setSecondarySelection,
        defaultWidth = "300px",
        fontVariant = "weaknessDescription",
    } = props;


    useEffect(() => {
        setHoverWeakness(index);
    }, [index]);

    // const markers = [
    //     {
    //         value: 1,
    //         label: '1',
    //     },
    //     {
    //         value: 2,
    //         label: '2',
    //     },
    //     {
    //         value: 3,
    //         label: '3',
    //     },
    //     {
    //         value: 4,
    //         label: '4',
    //     },
    //     {
    //         value: 5,
    //         label: '5',
    //     },
    // ]

    const subjectivityMarkers = [
        {
            value: 1,
            label: 'Subjective',
        },
        {
            value: 3,
            label: 'Neutral',
        },
        {
            value: 5,
            label: 'Objective',
        }
    ]

    const agreementMarkers = [
        {
            value: 1,
            label: 'Strongly Disagree',
        },
        {
            value: 3,
            label: 'Neutral',
        },
        {
            value: 5,
            label: 'Strongly Agree',
        }
    ]

    const index_of_associated_claims = weaknessSelection.map(
        (selection, sindex) => ({
            "selected": selection[index].selected,
            "sindex": sindex
        })
    ).filter(
        (selected) => selected.selected
    ).map(
        (selected) => selected.sindex
    );

    // console.log(weaknessTypeAnnotation);

    return (
        <Box
            sx={{
                margin: "10px",
                padding: "0px",
                borderRadius: "10px",
            }}
        >
            <NormalCard
                sx={{
                    margin: "0px",
                    padding: "0px",
                    width: defaultWidth,
                    height: defaultWidth,
                }}
            >
                <div style={{
                    backgroundColor: candidateColorList[index % candidateColorList.length],
                    width: "100%",
                    height: bandHeight
                }}>
                </div>
                <Box>
                    <Box sx={{
                        padding: "10px",
                    }}>
                        <TextBlock prefix="Weakness: " text={weakness.Reasoning} variant={fontVariant} />
                    </Box>
                </Box>
                <Divider sx={{
                    margin: "10px",
                }}>
                    <Chip variant="contained" label="Please Select Targeted Claims" />
                </Divider>
                <Box>
                    {index_of_associated_claims.map((sindex, inblockIndex) => {
                        return (
                            <Box
                                key={"associated-claim-" + index + "-" + sindex}
                            >
                            {inblockIndex != 0 && <Divider sx={{
                                margin: "0px",
                                padding: "0px 50px 0px 50px",
                            }}/>}
                                <SecondaryClaimSelection
                                    sindex={sindex}
                                    payload={payload}
                                    secondarySelection={secondarySelection}
                                    setSecondarySelection={setSecondarySelection}
                                />
                            </Box>
                        )
                    })}
                </Box>
                <Divider sx={{
                    margin: "10px",
                }}>
                    <Chip variant="contained" label="Annotation" />
                </Divider>
                <Box sx={{
                    padding: "10px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                }}>
                    <Box sx={{
                        order: 1,
                        padding: "10px",
                        width: "200px"
                    }}>
                        <TextBlock prefix="Subjectivity" text="" />
                    </Box>
                    <Box sx={{
                        order: 2,
                        width: "600px"
                    }}>
                        <Box sx={{
                            padding: "0px 50px 0px 50px",
                        }}>
                            <Slider
                                aria-labelledby="discrete-slider-subjectivity"
                                valueLabelDisplay="auto"
                                step={1}
                                value={weaknessTypeAnnotation.subjectivity}
                                // defaultValue={3}
                                onChange={(event, value) => {
                                    let newAnnotation = { ...weaknessTypeAnnotation };
                                    newAnnotation.subjectivity = value;
                                    setWeaknessTypeAnnotation(newAnnotation);
                                }}
                                min={1}
                                max={5}
                                marks={subjectivityMarkers}
                            />
                        </Box>
                    </Box>
                </Box>
                <Box sx={{
                    padding: "10px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                }}>
                    <Box sx={{
                        order: 1,
                        padding: "10px",
                        width: "200px"
                    }}>
                        <TextBlock prefix="Agreement" text="" />
                    </Box>
                    <Box sx={{
                        order: 2,
                        width: "600px"
                    }}>
                        <Box sx={{
                            padding: "0px 50px 0px 50px",
                        }}>
                            <Slider
                                aria-labelledby="discrete-slider-agreement"
                                valueLabelDisplay="auto"
                                step={1}
                                value={weaknessTypeAnnotation.agreement}
                                defaultValue={3}
                                onChange={(event, value) => {
                                    let newAnnotation = { ...weaknessTypeAnnotation };
                                    newAnnotation.agreement = value;
                                    setWeaknessTypeAnnotation(newAnnotation);
                                }}
                                min={1}
                                max={5}
                                marks={agreementMarkers}
                            />
                        </Box>
                    </Box>
                </Box>
                <Box sx={{
                    padding: "10px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                }}>
                    <Box sx={{
                        order: 1,
                        padding: "10px",
                        width: "200px"
                    }}>
                        <TextBlock prefix="Weakness Type" text="" />
                    </Box>
                    <Box sx={{
                        order: 2,
                        width: "600px"
                    }}>
                        {[
                            "insufficient",
                            "contradictory",
                            "novelty",
                            "clarity",
                            "related_work",
                            "other"
                        ].map((targWeakness, windex) => {
                            return (
                                <FormControl key={"weakness" + index + "type" + windex}>
                                    <FormControlLabel
                                        label={displayWeaknessTypeConversion[targWeakness]}
                                        control={
                                            <Checkbox
                                                checked={weaknessTypeAnnotation.weakness_type[targWeakness]}
                                                onChange={() => {
                                                    let newAnnotation = { ...weaknessTypeAnnotation };
                                                    console.log(newAnnotation);
                                                    newAnnotation.weakness_type[targWeakness] = !newAnnotation.weakness_type[targWeakness];
                                                    setWeaknessTypeAnnotation(newAnnotation);
                                                }}
                                            />
                                        }
                                    />
                                </FormControl>
                            )
                        })}
                    </Box>
                </Box>
                <Box sx={{
                    padding: "10px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                }}>
                    <Box sx={{
                        order: 1,
                        padding: "10px",
                        width: "200px"
                    }}>
                        <TextBlock prefix="Further Comments" text="" />
                    </Box>
                    <Box sx={{
                        order: 2,
                        width: "600px"
                    }}>
                        <FormControl key={"weakness-" + index + "-bad"}>
                            <FormControlLabel
                                label="Has Issues"
                                control={
                                    <Checkbox
                                        checked={weaknessBad}
                                        onChange={() => {
                                            setWeaknessBad(!weaknessBad);
                                        }}
                                    />
                                }
                            >
                            </FormControlLabel>
                        </FormControl>
                    </Box>
                </Box>
                <Box sx={{
                    padding: "20px",
                }}>
                    <TextField
                        id="outlined-textarea"
                        label="Comments"
                        placeholder="Comments"
                        multiline
                        variant="outlined"
                        sx={{
                            width: "100%",
                        }}
                        value={weaknessComment}
                        onChange={(event) => {
                            setWeaknessComment(event.target.value);
                        }}
                    />
                </Box>
                <Box sx={{
                    padding: "10px",
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}>
                    <Box sx={{
                        order: 1,
                        padding: "10px"
                    }}>
                        <Button variant="contained" onClick={() => {
                            if (index > 0) {
                                setWeaknessIndex(index - 1);
                                setHoverWeakness(index - 1);
                            } else {
                                setWeaknessIndex(0)
                                setHoverWeakness(-1);
                                setClaimIndex(payload.meta.claims.length - 1);
                            }
                        }}>
                            Prev
                        </Button>
                    </Box>
                    <Box sx={{
                        order: 2,
                        padding: "10px"
                    }}>
                        <Button variant="contained" onClick={() => {
                            setWeaknessIndex(index + 1);
                            setHoverWeakness(index + 1)
                        }}>
                            Next
                        </Button>
                    </Box>
                </Box>
            </NormalCard>
        </Box>
    );
}

export default AnnotatableWeaknessCard;