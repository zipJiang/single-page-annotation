import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { animated, useSpring } from '@react-spring/web';
import { NormalCard, EmphCard } from '../components/Cards';
import { Typography } from '@mui/material';
import { candidateColorList } from './ckp';


function ClaimSnapshot(props) {
    const {
        theme,
        claim,
        index,
        setSubclaimIndex,
        isCurrent,
        parentRef,
    } = props;

    const [spring, api] = useSpring(() => ({

        transform: "scale(1)",
        boxShadow: "0px 0px 5px rgba(0,0,0,0.1)",
        config: {
            mass: 1,
            tension: 170,
            friction: 26,
        }
    }));

    // If isCurrent scroll into view
    const ref = useRef(null);
    useEffect(() => {
        // don't scroll if parentReft is not scrollable
        const isScrollable = parentRef && parentRef.current.scrollHeight > parentRef.current.clientHeight;
        
        if (isCurrent && ref.current && isScrollable) {
            ref.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "center",
            });
        }
    }, [isCurrent]);

    const handleMouseEnter = () => {
        api.start({
            transform: "scale(1.05)",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
        });
    }

    const handleMouseLeave = () => {
        api.start({
            transform: "scale(1)",
            boxShadow: "0px 0px 5px rgba(0,0,0,0.1)",
        });
    }

    const handleClick = () => {
        setSubclaimIndex(index);
    }

    return (
        <animated.div
            ref={ref}
            style={{
                margin: "10px",
                padding: "0px",
                borderRadius: "10px",
                opacity: isCurrent ? 1 : 0.5,
                cursor: "pointer",
                ...spring,
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            <NormalCard
                sx={{
                    margin: "0px",
                    padding: "0px",
                    width: "100%",
                    height: "100px",
                }}
            >
                <div style={{
                    backgroundColor: isCurrent ? candidateColorList[index % candidateColorList.length] : theme.palette.grey.main,
                    width: "100%",
                    height: "20%"
                }}>
                </div>
                <div
                    style={{
                        height: "80%",
                    }}
                    onClick={handleClick}
                >
                    <Box sx={{
                        height: "100%",
                        padding: "10px",
                        overflow: "auto",
                    }}>
                        <Typography variant="squeezedPrompt" component="div">
                            {claim}
                        </Typography>
                    </Box>
                </div>
            </NormalCard>
        </animated.div>
    );
}

export default ClaimSnapshot;