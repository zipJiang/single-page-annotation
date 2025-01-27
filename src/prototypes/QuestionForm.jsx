import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import { EmphCard } from '../components/Cards';
import ClaimAnnotation from './ClaimAnnotation';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ReviewerViewer from './ReviewViewer';
import WeaknessCard from './WeaknessCard';
import WeaknessAnnotation from './WeaknessAnnotation';


function QuestionForm(props) {
    const {
        theme,
        payload,
        claimType,
        setClaimType,
        weaknessSelection,
        fullWeaknessSelection,
        setWeaknessSelection,
        claimIndex,
        setClaimIndex,
        setHoverWeakness,
        weaknessIndex,
        setWeaknessIndex,
        weaknessTypeAnnotation,
        setWeaknessTypeAnnotation,
        secondarySelection,
        setSecondarySelection,
        weaknessBads,
        setWeaknessBads,
        weaknessComments,
        setWeaknessComments,
        weaknessAppendix,
        setWeaknessAppendix,
    } = props;

    const setWeaknessSelectionForIndexFactory = (index) => {
        return (value) => {
            let newWeaknessSelection = [...weaknessSelection];
            newWeaknessSelection[index] = value;
            setWeaknessSelection(newWeaknessSelection);
        }
    }

    if (claimIndex >= payload.meta.claims.length) {
        return (
        <WeaknessAnnotation 
            theme={theme}
            payload={payload}
            weaknessSelection={fullWeaknessSelection}
            setHoverWeakness={setHoverWeakness}
            weaknessIndex={weaknessIndex}
            setWeaknessIndex={setWeaknessIndex}
            weaknessTypeAnnotation={weaknessTypeAnnotation}
            setWeaknessTypeAnnotation={setWeaknessTypeAnnotation}
            setClaimIndex={setClaimIndex}
            secondarySelection={secondarySelection}
            setSecondarySelection={setSecondarySelection}
            weaknessBads={weaknessBads}
            setWeaknessBads={setWeaknessBads}
            weaknessComments={weaknessComments}
            setWeaknessComments={setWeaknessComments}
            weaknessAppendix={weaknessAppendix}
            setWeaknessAppendix={setWeaknessAppendix}
        />);
    }

    return (
        <Box>
            <Box sx={{
                padding: "20px 0px 0px 0px",
            }}>
                <ClaimAnnotation
                    payload={payload}
                    claimIndex={claimIndex}
                    setClaimIndex={setClaimIndex}
                    claimType={claimType}
                    setClaimType={setClaimType}
                    weaknessSelection={weaknessSelection}
                    setHoverWeakness={setHoverWeakness}
                />
            </Box>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
            }}>
                {
                    payload.response['Weakness associated with claims'].map((weakness, index) => {
                        return (<WeaknessCard
                            key={"weakness" + index}
                            theme={theme}
                            claimIndex={claimIndex}
                            index={index}
                            weakness={weakness}
                            weaknessSelection={weaknessSelection[index]}
                            setWeaknessSelectionForIndex={setWeaknessSelectionForIndexFactory(index)}
                            setHoverWeakness={setHoverWeakness}
                            sx={{
                                order: index,
                            }}
                        />);
                    })
                }
            </Box>
        </Box>
    )
}

export default QuestionForm;