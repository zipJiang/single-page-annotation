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
import { AppBar, Toolbar } from '@mui/material';
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

    const [claimTypes, setClaimTypes] = useState(new Array(payload.meta.claims.length).fill(""));
    const [claimIndex, setClaimIndex] = useState(0);
    const [hoverWeakness, setHoverWeakness] = useState(-1);
    const numberOfWeaknesses = payload.response['Weakness associated with claims'].length;
    const [weaknessSelection, setWeaknessSelection] = useState(new Array(payload.meta.claims.length).fill(
        new Array(numberOfWeaknesses).fill({
            "selected": false,
            "subjectivity": 0,
            "uncertainty": 0,
        })
    ));

    useEffect(() => {
        const numberOfWeaknesses = payload.response['Weakness associated with claims'].length;
        setWeaknessSelection(new Array(payload.meta.claims.length).fill(
            new Array(numberOfWeaknesses).fill({
                "selected": false,
                "subjectivity": 0,
                "uncertainty": 0,
            })
        ));
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
                <LinearProgress variant="determinate" value={(claimIndex + 1) / (payload.meta.claims.length + 1) * 100} sx={{
                    height: "20px",
                }} />
            </Box>
            <Box sx={{
                padding: "30px",
                width: "100%",
            }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <AbstractViewer payload={payload} />
                        <ReviewerViewer payload={payload} hoverWeakness={hoverWeakness} theme={theme} />
                    </Grid>
                    <Grid item xs={6}>
                        {claimIndex >= payload.meta.claims.length ? <SubmitPage 
                            claimIndex={claimIndex}
                            setClaimIndex={setClaimIndex}
                        /> : <QuestionForm
                            theme={theme}
                            payload={payload} 
                            claimType={claimTypes[claimIndex]}
                            setClaimType={setClaimTypeFactory(claimIndex)}
                            weaknessSelection={weaknessSelection[claimIndex]}
                            setWeaknessSelection={setWeaknessSelectionFactory(claimIndex)}
                            claimIndex={claimIndex}
                            setClaimIndex={setClaimIndex}
                            setHoverWeakness={setHoverWeakness}
                        />
                        }
                    </Grid>
                </Grid>
            </Box>
            <input type="hidden" id="structuredOutput" name="structuredOutput" value={JSON.stringify(weaknessSelection)} />
        </Box>
    );
}

export default Interface;