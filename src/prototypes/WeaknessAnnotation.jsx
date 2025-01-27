import React from 'react';
import "./WeaknessAnnotation.css";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import WeaknessCard from './WeaknessCard';
import AnnotatableWeaknessCard from './AnnotatableWeaknessCard';

function WeaknessAnnotation(props) {

    const {
        theme,
        payload,
        weaknessSelection,
        setHoverWeakness,
        weaknessIndex,
        setWeaknessIndex,
        weaknessTypeAnnotation,
        setWeaknessTypeAnnotation,
        setClaimIndex,
        secondarySelection,
        setSecondarySelection,
        weaknessBads,
        setWeaknessBads,
        weaknessComments,
        setWeaknessComments,
        weaknessAppendix,
        setWeaknessAppendix,
    } = props;

    const setWeaknessTypeAnnotationForIndexFactory = (index) => {
        return (value) => {
            let newWeaknessTypeAnnotation = [...weaknessTypeAnnotation];
            newWeaknessTypeAnnotation[index] = value;
            setWeaknessTypeAnnotation(newWeaknessTypeAnnotation);
        }
    }

    const setSecondarySelectionForIndexFactory = (index) => {
        return (value) => {
            let newSecondarySelection = [...secondarySelection];
            newSecondarySelection[index] = value;
            setSecondarySelection(newSecondarySelection);
        }
    }

    const setWeaknessBadForIndexFactory = (index) => {
        return (value) => {
            let newWeaknessBads = [...weaknessBads];
            newWeaknessBads[index] = value;
            setWeaknessBads(newWeaknessBads);
        }
    }

    const setWeaknessCommentsForIndexFactory = (index) => {
        return (value) => {
            let newWeaknessComments = [...weaknessComments];
            newWeaknessComments[index] = value;
            setWeaknessComments(newWeaknessComments);
        }
    }

    const setWeaknessAppendixForIndexFactory = (index) => {
        return (value) => {
            let newWeaknessAppendix = [...weaknessAppendix];
            newWeaknessAppendix[index] = value;
            setWeaknessAppendix(newWeaknessAppendix);
        }
    }

    return (
        <Box sx={{
            padding: "20px 0px 0px 0px",
        }}>
            <Stack direction="row" spacing={2}
                sx={{
                    width: "100%",
                }}
            >
                {payload.response['Weakness associated with claims'].map((weakness, index) => {
                    return (
                        <Box key={"weakness-snapshot" + index}>
                            <WeaknessCard
                                theme={theme}
                                index={index}
                                claimIndex={-1}
                                weakness={weakness}
                                weaknessSelection={{
                                    "selected": index == weaknessIndex,
                                }}
                                setWeaknessSelectionForIndex={() => {}}
                                setHoverWeakness={setHoverWeakness}
                                defaultWidth="100px"
                                fontVariant="tinyWeaknessDescription"
                                bandPercentage={20}
                                mouseEnterToHover={false}
                                setWeaknessIndex={setWeaknessIndex}
                            />
                        </Box>
                    );
                })}
            </Stack>
            <Divider sx={{
                margin: "20px",
            }} />
            <Box sx={{
            }}>
                <AnnotatableWeaknessCard
                    payload={payload}
                    theme={theme}
                    index={weaknessIndex}
                    setClaimIndex={setClaimIndex}
                    weakness={payload.response['Weakness associated with claims'][weaknessIndex]}
                    weaknessSelection={weaknessSelection}
                    setWeaknessSelectionForIndex={() => {}}
                    setHoverWeakness={setHoverWeakness}
                    defaultWidth="100%"
                    bandHeight={30}
                    weaknessTypeAnnotation={weaknessTypeAnnotation[weaknessIndex]}
                    setWeaknessTypeAnnotation={setWeaknessTypeAnnotationForIndexFactory(weaknessIndex)}
                    setWeaknessIndex={setWeaknessIndex}A
                    secondarySelection={secondarySelection[weaknessIndex]}
                    setSecondarySelection={setSecondarySelectionForIndexFactory(weaknessIndex)}
                    weaknessBad={weaknessBads[weaknessIndex]}
                    weaknessComment={weaknessComments[weaknessIndex]}
                    setWeaknessBad={setWeaknessBadForIndexFactory(weaknessIndex)}
                    setWeaknessComment={setWeaknessCommentsForIndexFactory(weaknessIndex)}
                    weaknessAppendix={weaknessAppendix[weaknessIndex]}
                    setWeaknessAppendix={setWeaknessAppendixForIndexFactory(weaknessIndex)}
                />
            </Box>
        </Box>
    );
}

export default WeaknessAnnotation;