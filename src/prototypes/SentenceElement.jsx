import React from 'react';
import { alpha } from "@mui/material"
import { useSpring, animated, config } from '@react-spring/web'
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { ThemeContext } from '@emotion/react';
import { DoneAll } from '@mui/icons-material';


function SentenceElement(props) {
    const {
        sentence,
        index,
        sentSelect,
        setSentSelect,
        highlighting,
        disableFurtherSelection,
        setSnackOpen,
        theme
    } = props;

    const [spring, setSpring] = useSpring(() => ({
        boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.1)", // Initial shadow
        config: { tension: 300, friction: 15 },
    }))

    const onMouseEnter = () => {
        setSpring.start({
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)", // Increase shadow
        });
    }

    const onMouseLeave = () => {
        setSpring.start({
            boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.2)", // Increase shadow
        });
    };
    
    console.log(highlighting, index);

    const highlightSentence = (sentence, hg) => {
        // hg is a list of highlighting object with start_ch, end_ch, and weight,
        // which is the weight of a highlighting color for linear interpolation
        const weightMax = 2.0;
        let result = [];
        let current = 0;
        for (let i = 0; i < hg.length; i++) {
            const {start_ch, end_ch, weight} = hg[i];
            let normalized_weight = Math.min(weight, weightMax) / weightMax;
            if (current < start_ch) {
                result.push(<Typography sx={{
                }} variant="body1" key={"unwrapped" + i} component="span">
                    {sentence.slice(current, start_ch)}
                </Typography>);
            }
            result.push(
                <Typography variant="body1" sx={{
                    backgroundColor: alpha(theme.palette.primary.main, normalized_weight),
                }} key={"wrapped" + i} component="span">
                    {sentence.slice(start_ch, end_ch)}
                </Typography>
            );
            current = end_ch;
        }
        if (current < sentence.length) {
            result.push(sentence.slice(current, sentence.length));
        }

        return result;
    }

    return (
        <animated.div
            style={{...spring}}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={() => {
                if (disableFurtherSelection) {
                    if (sentSelect) {
                        setSentSelect(false);
                    }
                    else {
                        setSnackOpen(true);
                    }
                }
                else{
                    setSentSelect(!sentSelect);
                }
            }}
        >
            <Box 
                sx={{
                    padding: "10px",
                    // backgroundColor: theme.palette["card-bg-emph"].main
                    opacity: sentSelect ? 1.0 : 0.5,
                }}
            >
                <Typography variant='body1'>
                    {index + 1}. {highlightSentence(sentence, highlighting)}
                    {sentSelect && <DoneAll />}
                </Typography>
            </Box>
        </animated.div>
    );
}

export default SentenceElement;