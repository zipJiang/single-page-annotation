import './Interface.css';
import { useState } from 'react';
import { useEffect } from 'react';
import AbstractViewer from './AbstractViewer';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { AppBar, Divider, Toolbar } from '@mui/material';
import QuestionForm from './QuestionForm';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { lightPalette, darkPalette } from '../components/themes';
import { useMediaQuery } from '@mui/material';
import { parseCsvFromPublic } from '../components/utils';
import SubmitPage from './SubmitPage';
import ReviewerViewer from './ReviewViewer';


function Interface(props) {

    const {
        theme,
        payload,
    } = props;

    const newClaimTypes = new Array(payload.meta.claims.length);
    for (let i = 0; i < payload.meta.claims.length; i++) {
        newClaimTypes[i] = {
            "Descriptive": false,
            "Interpretive": false,
            "Related Work": false,
        }
    }

    const [claimTypes, setClaimTypes] = useState(
        newClaimTypes
    );
    const [claimIndex, setClaimIndex] = useState(0);
    const [hoverWeakness, setHoverWeakness] = useState(-1);
    const numberOfWeaknesses = payload.response['Weakness associated with claims'].length;
    const [weaknessSelection, setWeaknessSelection] = useState(new Array(payload.meta.claims.length).fill(null)
        .map(
            () => new Array(numberOfWeaknesses).fill(null).map(() => 
                ({
                    "selected": false,
                    // "subjectivity": 0,
                    // "uncertainty": 0,
                }))
        )
    );
    
    const [weaknessTypeAnnotation, setWeaknessTypeAnnotation] = useState(
        new Array(numberOfWeaknesses).fill(null).map(() => ({
            "subjectivity": 3,
            "agreement": 3,
            "weakness_type": {
                "insufficient": false,
                "contradictory": false,
                "novelty": false,
                "clarity": false,
                "related_work": false,
                "other": false
            }
        }))
    );
    const [weaknessBads, setWeaknessBads] = useState(new Array(numberOfWeaknesses).fill(false));
    const [weaknessComments, setWeaknessComments] = useState(
        new Array(numberOfWeaknesses).fill(null).map(() => (""))
    );
    const [weaknessIndex, setWeaknessIndex] = useState(0);
    const [secondarySelection, setSecondarySelection] = useState(
        new Array(payload.response['Weakness associated with claims'].length
        ).fill(null).map(() => new Set())
    );

    const [weaknessAppendix, setWeaknessAppendix] = useState(new Array(numberOfWeaknesses).fill(null).map(() => ("")));

    useEffect(() => {
        const numberOfWeaknesses = payload.response['Weakness associated with claims'].length;
        setWeaknessSelection(
            new Array(payload.meta.claims.length).fill(null)
            .map(
                () => new Array(numberOfWeaknesses).fill(null).map(() => 
                    ({
                        "selected": false,
                        // "subjectivity": 0,
                        // "uncertainty": 0,
                    }))
            )
        );
        setWeaknessTypeAnnotation(
            new Array(numberOfWeaknesses).fill(null).map(() => ({
                "subjectivity": 3,
                "agreement": 3,
                "weakness_type": {
                    "insufficient": false,
                    "contradictory": false,
                    "novelty": false,
                    "clarity": false,
                    "related_work": false,
                    "other": false
                }
            }))
        );
        setClaimTypes(new Array(payload.meta.claims.length).fill(null).map(() => ({
            "Descriptive": false,
            "Interpretive": false,
            "Related Work": false,
        })));
        setClaimIndex(0);
        setWeaknessIndex(0);
        setHoverWeakness(-1);
        setSecondarySelection(new Array(numberOfWeaknesses).fill(null).map(() => new Set()));
        setWeaknessBads(new Array(numberOfWeaknesses).fill(false));
        setWeaknessComments(new Array(numberOfWeaknesses).fill(null).map(() => ("")));
        setWeaknessAppendix(new Array(numberOfWeaknesses).fill(null).map(() => ("")));
    }, [payload]);

    const setWeaknessSelectionFactory = (claimIndex) => {
        return (value) => {
            let newWeaknessSelection = [...weaknessSelection];
            newWeaknessSelection[claimIndex] = value;
            setWeaknessSelection(newWeaknessSelection);
        }
    }

    const setClaimTypeFactory = (claimIndex) => {
        return (value) => {
            let newClaimTypes = [...claimTypes];
            newClaimTypes[claimIndex] = value;
            setClaimTypes(newClaimTypes);
        }
    }

    return (
        <Box>
            <Box sx={{
                padding: "0px 0px 0px 0px",
                width: "100%",
            }}>
                <div style={{
                    borderColor: theme.palette.background.default,
                    borderStyle: "solid",
                    borderWidth: "0px 0px 10px 0px",
                    boxShadow: "0px 0px 10px rgba(0,0,0,0.5)",
                    position: "relative"
                }}>
                    <LinearProgress variant="determinate" value={(claimIndex + 1) / (payload.meta.claims.length + 1) * 100} sx={{
                        height: "20px",
                    }} />
                </div>
            </Box>
            <Box sx={{
                padding: "30px",
                width: "100%",
                height: "95vh",
                overflow: "auto",
            }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <AbstractViewer payload={payload} />
                        <ReviewerViewer payload={payload} hoverWeakness={hoverWeakness} theme={theme} />
                    </Grid>
                    <Grid item xs={6}>
                        {(claimIndex >= payload.meta.claims.length && weaknessIndex >= numberOfWeaknesses ) ? <SubmitPage 
                            hoverWeakness={hoverWeakness}
                            setHoverWeakness={setHoverWeakness}
                            weaknessIndex={weaknessIndex}
                            setWeaknessIndex={setWeaknessIndex}
                        /> : <QuestionForm
                                theme={theme}
                                payload={payload} 
                                claimType={claimTypes[claimIndex]}
                                setClaimType={setClaimTypeFactory(claimIndex)}
                                weaknessSelection={weaknessSelection[claimIndex]}
                                fullWeaknessSelection={weaknessSelection}
                                setWeaknessSelection={setWeaknessSelectionFactory(claimIndex)}
                                claimIndex={claimIndex}
                                setClaimIndex={setClaimIndex}
                                setHoverWeakness={setHoverWeakness}
                                weaknessIndex={weaknessIndex}
                                setWeaknessIndex={setWeaknessIndex}
                                weaknessTypeAnnotation={weaknessTypeAnnotation}
                                setWeaknessTypeAnnotation={setWeaknessTypeAnnotation}
                                secondarySelection={secondarySelection}
                                setSecondarySelection={setSecondarySelection}
                                weaknessBads={weaknessBads}
                                setWeaknessBads={setWeaknessBads}
                                weaknessComments={weaknessComments}
                                setWeaknessComments={setWeaknessComments}
                                weaknessAppendix={weaknessAppendix}
                                setWeaknessAppendix={setWeaknessAppendix}
                            />
                        }
                    </Grid>
                </Grid>
            </Box>
            <input type="hidden" id="structuredOutput" name="claimStructuredOutput" value={JSON.stringify(weaknessSelection)} />
            <input type="hidden" id="claimTypeAnnotation" name="claimTypeAnnotation" value={JSON.stringify(claimTypes)} />
            <input type="hidden" id="weaknessTypeAnnotation" name="weaknessTypeAnnotation" value={JSON.stringify(weaknessTypeAnnotation)} />
            <input type="hidden" id="secondarySelection" name="secondarySelection" value={JSON.stringify(
                secondarySelection.map((set) => Array.from(set))
            )} />
            <input type="hidden" id="weaknessBad" name="weaknessBad" value={
                JSON.stringify(weaknessBads)
            } />
            <input type="hidden" id="weaknessComments" name="weaknessComments" value={
                JSON.stringify(weaknessComments)
            } />
            <input type="hidden" id="weaknessAppendix" name="weaknessAppendix" value={
                JSON.stringify(weaknessAppendix)
            } />
        </Box>
    );
}

export default Interface;