import React, { useState } from 'react';
import QuestionCard from './QuestionCard';
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


function QuestionForm(props) {
    const {
        theme,
        payload,
        claimType,
        setClaimType,
        weaknessSelection,
        setWeaknessSelection,
        claimIndex,
        setClaimIndex,
        setHoverWeakness,
    } = props;

    const setWeaknessSelectionForIndexFactory = (index) => {
        return (value) => {
            let newWeaknessSelection = [...weaknessSelection];
            newWeaknessSelection[index] = value;
            setWeaknessSelection(newWeaknessSelection);
        }
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