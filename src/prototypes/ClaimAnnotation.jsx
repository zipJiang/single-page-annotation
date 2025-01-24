import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Chip, Divider, FormControlLabel, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Contrasting from './Contrasting';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { EmphCard, NormalCard } from '../components/Cards';
import { LabeledSlider } from '../components/Sliders';
import Switch from '@mui/material/Switch';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { animated, useSpring } from '@react-spring/web';


const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.grey.main,
        // color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}));


function ClaimAnnotation(props) {
    const {
        theme,
        payload,
        evidentialSupport,
        setEvidentialSupport,
        sourceNotMakeSense,
        setSourceNotMakeSense,
        wrongDecontextualized,
        setWrongDecontextualized,
        subclaimIndex,
        setSubclaimIndex,
        notsure,
        setNotsure,
    } = props;

    // We'll only do the first, so that with the new
    // data format we'll do snippet selection for each
    // of the claim

    const [decontextualized, setDecontextualized] = useState(false);
    const [metadataDisplay, setMetadataDisplay] = useState(false);

    const [displayMetaSpring, apiDisplayMeta] = useSpring(() => ({
        maxHeight: metadataDisplay ? "500px" : "0px",
        paddingTop: metadataDisplay ? "20px" : "0px",
        paddingBottom: metadataDisplay ? "20px" : "0px",
        config: {
            duration: 100,
        },
    }));

    const evFormat = (num) => {
        return "E = " + (2 * num - 1.).toFixed(2);
    }

    const evidential_markers = [
        {
            value: 0,
            label: <div className={"TopLabel"}>Fully Refuted</div>,
        },
        {
            value: 5000,
            label: <div className={"BottomLabel"}>Neither</div>,
        },
        {
            value: 10000,
            label: <div className={"TopLabel"}>Fully Supported</div>,
        },
    ];

    return (
        <Box>
            <NormalCard sx={{
                margin: "20px"
            }}>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                }}>
                    <Box sx={{
                        order: 1
                    }}>
                        <FormControlLabel label={<Chip label="D" />}
                            control={
                                <Switch
                                    checked={decontextualized}
                                    onChange={(e) => {
                                        setDecontextualized(e.target.checked);
                                    }}
                                />
                            }
                        />
                    </Box>
                    <Box sx={{
                        order: 2
                    }}>
                        <FormControlLabel label={<Chip label="More Info" />}
                            control={
                                <Switch
                                    checked={metadataDisplay}
                                    onChange={(e) => {
                                        setMetadataDisplay(e.target.checked);
                                        apiDisplayMeta.start({
                                            paddingTop: e.target.checked ? "20px" : "0px",
                                            paddingBottom: e.target.checked ? "20px" : "0px",
                                            maxHeight: e.target.checked ? "500px" : "0px",
                                        });
                                    }}
                                />
                            }
                        />
                    </Box>
                </Box>
                <Box sx={{
                }}>
                    <FormControlLabel label={"Bad Source"}
                        control={
                            <Checkbox checked={sourceNotMakeSense}
                                onChange={(e) => setSourceNotMakeSense(e.target.checked)}
                                />
                        }
                    />
                    <FormControlLabel label={"Bad Decontextualization"}
                        control={
                            <Checkbox checked={wrongDecontextualized}
                                onChange={(e) => setWrongDecontextualized(e.target.checked)}
                            />
                        }
                    />
                    <FormControlLabel label={"I'm Uncertain"}
                        control={
                            <Checkbox checked={notsure}
                                onChange={(e) => setNotsure(e.target.checked)}
                            />
                        }
                    />

                </Box>
                <animated.div style={{
                    backgroundColor: theme.palette['card-bg-emph'].main,
                    borderRadius: "10px",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    overflow: metadataDisplay ? "auto" : "hidden",
                    ...displayMetaSpring
                }}>
                    <Stack direction="column" spacing={1}>
                        <Box>
                            <Typography variant='highlightPrompt' component='span'>
                                Report Title:&nbsp;
                            </Typography>
                            <Typography variant='prompt' component='span'>
                                {payload["report-title"]}
                            </Typography>
                        </Box>
                        <Box>
                            {payload["intro-text"].map((sentence, sindex) => {
                                return (
                                    <Typography variant='prompt' key={"sentence-" + sindex} component="span">
                                        {sindex == 0 && <Typography variant='highlightPrompt' component="span">Abstract:&nbsp;</Typography>}
                                        {sentence}
                                    </Typography>
                                );
                            })}
                        </Box>
                        <Box>
                            <Typography variant='highlightPrompt' component="span">
                                {payload["section-title"]}:&nbsp;
                            </Typography>
                            {payload['paragraph-text'].map((sentence, sindex) => {
                                return (
                                    sindex != payload['sentence-idx'] ?
                                    <Typography variant='prompt' key={"sentence-" + sindex} component="span">
                                        {sentence}
                                    </Typography> :
                                    <Typography variant='highlightPrompt' key={"sentence-" + sindex} component="span">
                                        <u>{sentence}</u>
                                    </Typography>
                                );
                            })}
                        </Box>
                    </Stack>
                </animated.div>
                <Divider sx={{
                    margin: "10px",
                    display: metadataDisplay ? "block" : "none",
                }}/>
                <Box sx={{
                }}>
                    <Typography variant='highlightPrompt' component="span">
                        Claim:
                        {/* {decontextualized ? "Decontextualized: " : "Claim: "} */}
                    </Typography>
                    <Typography variant='prompt' component="span">
                        {/* {decontextualized ?
                            payload['sentence-subclaims-decontextualized'][subclaimIndex] :
                            payload['sentence-subclaims'][subclaimIndex]
                        } */}
                        <Contrasting 
                            original={payload['sentence-subclaims'][subclaimIndex]}
                            edited={decontextualized ?
                                payload['sentence-subclaims-decontextualized'][subclaimIndex] :
                                payload['sentence-subclaims'][subclaimIndex]
                            }
                        />
                    </Typography>
                </Box>
            </NormalCard>
            <EmphCard sx={{
                margin: "20px"
            }}>
                <Box>
                    <Box>
                        <Typography variant='highlightPrompt'>
                            Evidential Support:&nbsp;
                        </Typography>
                        <Typography variant='prompt' component="span">
                            To what extent does the selected text in the source support or refute the decontextualized claim?
                        </Typography>
                    </Box>
                    <Box sx={{
                        textAlign: "center",
                        alignItems: "center"
                    }}>
                        <LabeledSlider
                            setter={setEvidentialSupport}
                            value={evidentialSupport}
                            valueLabelFormat={evFormat}
                            scale={(v) => v / 10000}
                            marks={evidential_markers}
                            sx={{
                                width: "80%",
                                '& .MuiSlider-markLabel': {
                                fontSize: "15px",
                                },
                            }}
                        />
                    </Box>
                </Box>
            </EmphCard>
        </Box>
    );
}

export default ClaimAnnotation;