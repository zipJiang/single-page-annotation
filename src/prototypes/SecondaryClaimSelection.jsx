import { useState, useEffect } from 'react';
import { animated, useSpring } from '@react-spring/web';
import GradeIcon from '@mui/icons-material/Grade';
import Box from '@mui/material/Box';
import TextBlock from './TextBlock';


function SecondaryClaimSelection(props) {

    const {
        sindex,
        payload,
        secondarySelection,
        setSecondarySelection,
    } = props;

    const [spring, api] = useSpring(() => ({
        transform: "scale(1)",
        boxShadow: "0px 0px 0px rgba(0,0,0,0.1)",
        config: {
            mass: 1,
            tension: 170,
            friction: 26,
    }}));

    const handleMouseEnter = () => {
        api.start({
            transform: "scale(1.01)",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
        });
    }

    const handleMouseLeave = () => {
        api.start({
            transform: "scale(1)",
            boxShadow: "0px 0px 0px rgba(0,0,0,0.1)",
        });
    }

    let claim_regex = /claim\d+: (.*)/si;

    return (
        <animated.div
            style={{
                padding: "10px",
                ...spring
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => {
                if (secondarySelection.has(sindex)) {
                    let newSecondarySelection = new Set(secondarySelection);
                    newSecondarySelection.delete(sindex);
                    setSecondarySelection(newSecondarySelection);
                } else {
                    let newSecondarySelection = new Set(secondarySelection);
                    newSecondarySelection.add(sindex);
                    setSecondarySelection(newSecondarySelection);
                }
            }}
        >
            <Box 
                sx={{
                    padding: "10px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                }}
            >
                <Box sx={{
                    order: 1,
                    width: "5%",
                }}>
                    {secondarySelection.has(sindex) && <GradeIcon />}
                </Box>
                <Box sx={{
                    order: 2,
                    width: "90%",
                }}>
                    <TextBlock
                        prefix={"Claim " + (sindex + 1) + ": "}
                        text={
                            payload.meta.claims[sindex].match(claim_regex)[1]
                        }
                    />
                </Box>
            </Box>
        </animated.div>
    );
}

export default SecondaryClaimSelection;