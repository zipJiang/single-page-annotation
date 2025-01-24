import './Interface.css';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { NormalCard } from './components/Cards';
import { AppBar, Grid, Toolbar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { lightPalette, darkPalette } from './components/themes';
import { useMediaQuery } from '@mui/material';
import { parseCsvFromPublic } from './components/utils';
import SentenceSelection from './prototypes/SentenceSelection';
import ClaimAnnotation from './prototypes/ClaimAnnotation';
import ClaimSnapshotList from './prototypes/ClaimSnapshotList';


function Interface(props) {

    const {
        theme,
        payload,
    } = props;

    const [sourceNotMakeSense, setSourceNotMakeSense] = useState(false);
    const [sentSelectIndices, setSentSelectIndices] = useState(
        new Array(payload['sentence-subclaims'].length).fill(null).map(
            () => new Array(payload['source-text'].length).fill(false)
        )
    );
    const [wrongDecontextualized, setWrongDecontextualized] = useState(
        new Array(payload['sentence-subclaims'].length).fill(false)
    );
    const [highlightThreshold, setHighlightThreshold] = useState(0.5);
    const [notsure, setNotsure] = useState(
        new Array(payload['sentence-subclaims'].length).fill(false)
    );
    const [evidentialSupport, setEvidentialSupport] = useState(
        new Array(payload['sentence-subclaims'].length).fill(5000)
    );
    const [currentIndex, setCurrentIndex] = useState(0);

    const setIndexFactory = (setter, old_value, index) => {
        return (value) => {
            const new_value = [...old_value];
            new_value[index] = value;
            setter(new_value);
        }
    };

    useEffect(() => {
        setSentSelectIndices(
            new Array(payload['sentence-subclaims'].length).fill(null).map(
                () => new Array(payload['source-text'].length).fill(false)
            )
        );
        setWrongDecontextualized(
            new Array(payload['sentence-subclaims'].length).fill(false)
        );
    }, [payload]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <SentenceSelection
                    sentSelectIndices={sentSelectIndices[currentIndex]}
                    setSentSelectIndices={setIndexFactory(setSentSelectIndices, sentSelectIndices, currentIndex)}
                    highlighting={payload['highlighted-weights']}
                    threshold={highlightThreshold}
                    payload={payload}
                    theme={theme}
                />
                <input type="hidden" name="sentSelectIndices" value={JSON.stringify(sentSelectIndices)} />
                <input type="hidden" name="sourceNotMakeSense" value={sourceNotMakeSense} />
                <input type="hidden" name="wrongDecontextualized" value={wrongDecontextualized} />
                <input type='hidden' name='notsure' value={notsure} />
                <input type='hidden' name='evidentialSupport' value={evidentialSupport} />
            </Grid>
            <Grid item xs={6} sx={{
            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}>
                    <Box sx={{
                        maxHeight: `calc(90vh + 60px)`,
                        overflow: "auto",
                        order: 1,
                    }}>
                        <ClaimAnnotation 
                            theme={theme}
                            payload={payload}
                            evidentialSupport={evidentialSupport[currentIndex]}
                            setEvidentialSupport={setIndexFactory(setEvidentialSupport, evidentialSupport, currentIndex)}
                            sourceNotMakeSense={sourceNotMakeSense}
                            setSourceNotMakeSense={setSourceNotMakeSense}
                            wrongDecontextualized={wrongDecontextualized[currentIndex]}
                            setWrongDecontextualized={setIndexFactory(setWrongDecontextualized, wrongDecontextualized, currentIndex)}
                            notsure={notsure[currentIndex]}
                            setNotsure={setIndexFactory(setNotsure, notsure, currentIndex)}
                            subclaimIndex={currentIndex}
                            setSubclaimIndex={setCurrentIndex}
                        />
                        <Box sx={{
                            width: "100%",
                            padding: "20px",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            flexWrap: "wrap",
                        }}>
                            <Box sx={{
                                order: 1
                            }}>
                                <Button variant="contained" color="primary" disabled={
                                    currentIndex == 0
                                } onClick={() => {
                                    if (currentIndex > 0) {
                                        setCurrentIndex(currentIndex - 1);
                                    }
                                }}>
                                    {<Typography color={theme.palette.white.main}>PREV</Typography>}
                                </Button>
                            </Box>
                            <Box sx={{
                                order: 2
                            }}>
                                <Button type="submit" variant="contained" color="primary">
                                    {<Typography color={theme.palette.white.main}>Submit</Typography>}
                                </Button>
                            </Box>
                            <Box sx={{
                                order: 3
                            }}>
                                <Button variant="contained" color="primary" disabled={
                                    currentIndex == payload['sentence-subclaims'].length - 1
                                } onClick={() => {
                                    if (currentIndex < payload['sentence-subclaims'].length - 1) {
                                        setCurrentIndex(currentIndex + 1);
                                    }
                                }}>
                                    {<Typography color={theme.palette.white.main}>NEXT</Typography>}
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{
                        paddingTop: "20px",
                        order: 2,
                    }}>
                        <Divider orientation="vertical" sx={{
                            height: `calc(90vh + 40px)`,
                        }} />
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={2}>
                <ClaimSnapshotList
                    theme={theme}
                    payload={payload}
                    subclaimIndex={currentIndex}
                    setSubclaimIndex={setCurrentIndex}
                >
                </ClaimSnapshotList>
            </Grid>
        </Grid>
    );

}

export default Interface;