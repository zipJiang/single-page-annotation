import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { animated, useSpring } from '@react-spring/web';
import { NormalCard, EmphCard } from '../components/Cards';
import Slider from '@mui/material/Slider';
import { Height } from '@mui/icons-material';
import TextBlock from './TextBlock';


const candidateColorList = [
    "#F94144",
    "#F3722C",
    "#F8961E",
    "#F9844A",
    "#F9C74F",
    "#90BE6D",
    "#43AA8B",
    "#4D908E",
    "#577590",
    "#277DA1",
]


function WeaknessCard(props) {
    const {
        theme,
        index,
        claimIndex,
        weakness,
        weaknessSelection,
        setWeaknessSelectionForIndex,
        setHoverWeakness
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

    const [innerSpring, innerApi] = useSpring(() => ({
        from: {
            height: "90%"
        },
        config: {
            mass: 1,
            tension: 170,
            friction: 26,
        }
    }));

    const handleMouseEnter = () => {
        api.start({
            transform: "scale(1.05)",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
        });
        setHoverWeakness(index);
    }

    const handleMouseLeave = () => {
        api.start({
            transform: "scale(1)",
            boxShadow: "0px 0px 5px rgba(0,0,0,0.1)",
        });
    }

    const handleClick = () => {
        setWeaknessSelectionForIndex({
            ...weaknessSelection,
            selected: !weaknessSelection.selected,
        });
    }

    // useEffect(() => {
    //     if (weaknessSelection) {
    //         setWeaknessSelectionForIndex({
    //             ...weaknessSelection,
    //             selected: false,
    //             uncertainty: 0,
    //             subjectivity: 0,
    //         })
    //     }
    // }, [claimIndex]);

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
        },
    ]

    useEffect(() => {
        if (weaknessSelection && weaknessSelection.selected) {
            innerApi.start({
                to: {
                    height: "65%"
                }
            })
        } else {
            innerApi.start({
                to: {
                    height: "90%"
                }
            });
        }
    }, [weaknessSelection]);

    return (
        <animated.div
            style={{
                margin: "10px",
                padding: "0px",
                borderRadius: "10px",
                opacity: weaknessSelection && weaknessSelection.selected ? 1 : 0.5,
                ...spring
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <NormalCard
                sx={{
                    margin: "0px",
                    padding: "0px",
                    width: "300px",
                    height: "300px",
                }}
            >
                <Box sx={{
                    backgroundColor: weaknessSelection && weaknessSelection.selected ? candidateColorList[(4 * index) % candidateColorList.length] : theme.palette.grey.main,
                    width: "100%",
                    height: "10%",
                }}>
                </Box>
                <animated.div
                    style={{
                        height: "90%",
                        ...innerSpring
                    }}
                    onClick={handleClick}
                >
                    <Box sx={{
                        height: "100%",
                        padding: "10px",
                        overflow: "auto",
                    }}>
                        <TextBlock prefix="Weakness: " text={weakness.Reasoning} variant="weaknessDescription" />
                    </Box>
                </animated.div>
                <Divider />
                <Box sx={{
                    padding: "5px 20px 0px 20px",
                    height: "25%",
                }}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "100%",
                    }}>
                        <Box sx={{
                            order: 1,
                            width: "20%",
                        }}>
                            <TextBlock prefix="Conf: " text="" />
                        </Box>
                        <Box sx={{
                            order: 2,
                            width: "200px",
                        }}>
                            <Slider
                                aria-label={"confidence" + index}
                                size="small"
                                defaultValue={0} 
                                value={weaknessSelection ? weaknessSelection.uncertainty : 0}
                                valueLabelDisplay="auto"
                                min={1}
                                max={5}
                                step={1}
                                sx={{
                                    color: candidateColorList[(4 * index) % candidateColorList.length],
                                }}
                                disabled={!(weaknessSelection && weaknessSelection.selected)}
                                onChange={(event, value) => {
                                    setWeaknessSelectionForIndex({
                                        ...weaknessSelection,
                                        uncertainty: value,
                                    });
                                }}
                            />
                        </Box>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "100%",
                    }}>
                        <Box sx={{
                            order: 1,
                            width: "20%",
                        }}>
                            <TextBlock prefix="Subj: " text="" />
                        </Box>
                        <Box sx={{
                            order: 2,
                            width: "200px",
                        }}>
                            <Slider
                                aria-label={"subjectivity" + index}
                                size="small"
                                defaultValue={0} 
                                value={weaknessSelection ? weaknessSelection.subjectivity : 0}
                                valueLabelDisplay="auto"
                                min={1}
                                max={5}
                                step={1}
                                sx={{
                                    color: candidateColorList[(4 * index) % candidateColorList.length],
                                }}
                                disabled={!(weaknessSelection && weaknessSelection.selected)}
                                onChange={(event, value) => {
                                    setWeaknessSelectionForIndex({
                                        ...weaknessSelection,
                                        subjectivity: value,
                                    });
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
            </NormalCard>
        </animated.div>
    );
}

export default WeaknessCard;