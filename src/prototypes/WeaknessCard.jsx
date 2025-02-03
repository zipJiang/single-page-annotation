import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';
import { animated, useSpring } from '@react-spring/web';
import { NormalCard, EmphCard } from '../components/Cards';
import Slider from '@mui/material/Slider';
import { Cancel, Height } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import TextBlock from './TextBlock';
import CancelIcon from '@mui/icons-material/Cancel';


function WeaknessCard(props) {
    const {
        theme,
        index,
        weakness,
        backgroundColor,
        removeColor,
        setWeaknessDesc,
        setWeaknessDescs,
        setHoverWeakness,
        setSelections,
        focused,
        setFocusIndex,
        defaultWidth = "300px",
        fontVariant = "weaknessDescription",
        bandPercentage = 10,
        setWeaknessIndex = (v) => {},
        mouseEnterToHover = true
    } = props;

    const [spring, api] = useSpring(() => ({

        transform: "scale(1)",
        boxShadow: "0px 0px 5px rgba(0,0,0,0.1)",
        opacity: 1,
        config: {
            mass: 1,
            tension: 170,
            friction: 26,
        }
    }));

    const [crossSpring, crossApi] = useSpring(() => ({
        transform: "scale(1)",
        boxShadow: "0px 0px 5px rgba(0,0,0,0.1)",
        opacity: 0.5,
        config: {
            mass: 1,
            tension: 170,
            friction: 26,
        }
    }));

    const handleMouseEnter = () => {
        if (focused)
            return;
        api.start({
            transform: "scale(1.05)",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
        });
        if (mouseEnterToHover)
            setHoverWeakness(index);
    }

    const handleMouseLeave = () => {
        api.start({
            transform: "scale(1)",
            boxShadow: "0px 0px 5px rgba(0,0,0,0.1)",
        });
        if (mouseEnterToHover)
            setHoverWeakness(-1);
    }

    const handleCrossMouseEnter = () => {
        crossApi.start({
            opacity: 1,
        });
    }

    const handleCrossMouseLeave = () => {
        crossApi.start({
            opacity: 0.5,
        });
    }

    const handleCrossClick = () => {    
        // api.start({
        //     from: {
        //         transform: "translateY(0px)",
        //         opacity: 1,
        //     },
        //     to: {
        //         transform: "translateY(100px)",
        //         opacity: 0.0,
        //     },
        //     config: {
        //         mass: 1,
        //         tension: 170,
        //         friction: 26,
        //     }
        // });

        // setFocusIndex(-1);
        setFocusIndex(-1);

        removeColor();
        setWeaknessDescs((prev) => {
            const newWeaknessDescs = [...prev];
            newWeaknessDescs.splice(index, 1);
            return newWeaknessDescs;
        });
        setHoverWeakness(-1);
        setSelections((prev) => {
            const newSelections = [...prev];
            newSelections.splice(index, 1);
            return newSelections;
        });

    }

    const markers = [
        {
            value: 1,
            label: '1',
        },
        {
            value: 2,
            label: '2',
        },
        {
            value: 3,
            label: '3',
        },
        {
            value: 4,
            label: '4',
        },
        {
            value: 5,
            label: '5',
        }
    ]

    return (
        <animated.div
            style={{
                margin: "10px",
                padding: "0px",
                borderRadius: "10px",
                cursor: focused ? null : "pointer",
                overflow: "hidden",
                ...spring,
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => {
                setFocusIndex(index);
            }}
        >
            <NormalCard
                sx={{
                    margin: "0px",
                    padding: "0px",
                    width: defaultWidth,
                    height: defaultWidth,
                }}
            >
                <div style={{
                    backgroundColor: backgroundColor,
                    width: "100%",
                    height: bandPercentage + "%"
                }}>
                    {focused && <animated.div
                        style={{
                            cursor: "pointer",
                            right: "10px",
                            top: "10px",
                            ...crossSpring,
                        }}
                        onMouseEnter={handleCrossMouseEnter}
                        onMouseLeave={handleCrossMouseLeave}
                        onClick={handleCrossClick}
                    >
                            <CancelIcon />
                        </animated.div>}
                </div>
                <animated.div
                    style={{
                        height: (100 - bandPercentage) + "%",
                    }}
                >
                    <Box sx={{
                        height: "100%",
                        padding: "10px",
                        overflow: "auto",
                    }}>
                        {!focused ? <Box sx={{
                            paddingTop: "20px",
                        }}>
                                <Typography variant="weaknessDescription">
                                    <b>Selection Confidence: </b>
                                    {markers[weakness - 1].label}
                                </Typography>
                            </Box> : <Box sx={{
                            height: "100%",
                            overflow: "auto",
                            paddingTop: "20px",
                        }}>
                            {/* <TextField
                                id="outlined-textarea"
                                label="Weakness"
                                placeholder="Describe the weakness"
                                multiline
                                variant="outlined"
                                sx={{
                                    width: "100%",
                                }}
                                value={weakness}
                                onChange={(event) => {
                                    setWeaknessDesc(event.target.value);
                                }}
                            /> */}
                            <Box sx={{
                                width: "100%",
                                paddingRight: "20px",
                                paddingLeft: "20px",
                            }}>
                                <Box>
                                    <Typography variant="weaknessDescription" sx={{
                                        fontWeight: "bold",
                                    }}>
                                        To what extent do you believe that you can find the target claim(s) for the selected weakness span?
                                    </Typography>
                                </Box>
                                <Slider
                                    aria-label="Weakness Type"
                                    defaultValue={1}
                                    step={1}
                                    marks={markers}
                                    min={1}
                                    max={5}
                                    onChange={(event, value) => {
                                        setWeaknessDesc(event.target.value);
                                    }}
                                />
                            </Box>
                        </Box>}
                    </Box>
                </animated.div>
            </NormalCard>
        </animated.div>
    );
}

export default WeaknessCard;