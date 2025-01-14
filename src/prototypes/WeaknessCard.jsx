import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { animated, useSpring } from '@react-spring/web';
import { NormalCard, EmphCard } from '../components/Cards';
import Slider from '@mui/material/Slider';
import { Height } from '@mui/icons-material';
import TextBlock from './TextBlock';
import { candidateColorList } from './ckp';


function WeaknessCard(props) {
    const {
        theme,
        index,
        claimIndex,
        weakness,
        weaknessSelection,
        setWeaknessSelectionForIndex,
        setHoverWeakness,
        defaultWidth = "300px",
        fontVariant = "weaknessDescription",
        bandPercentage = 10,
        setWeaknessIndex = (v) => {},
        mouseEnterToHover = true
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

    const handleMouseEnter = () => {
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
    }

    const handleClick = () => {
        if (mouseEnterToHover) {
            setWeaknessSelectionForIndex({
                ...weaknessSelection,
                selected: !weaknessSelection.selected,
            });
        } else {
            // We just change the hover state
            // as well as
            setWeaknessIndex(index);
        }
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
        },
    ]

    return (
        <animated.div
            style={{
                margin: "10px",
                padding: "0px",
                borderRadius: "10px",
                opacity: weaknessSelection && weaknessSelection.selected ? 1 : 0.5,
                cursor: "pointer",
                ...spring,
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
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
                    backgroundColor: weaknessSelection && weaknessSelection.selected ? candidateColorList[index % candidateColorList.length] : theme.palette.grey.main,
                    width: "100%",
                    height: bandPercentage + "%"
                }}>
                </div>
                <animated.div
                    style={{
                        height: (100 - bandPercentage) + "%",
                    }}
                    onClick={handleClick}
                >
                    <Box sx={{
                        height: "100%",
                        padding: "10px",
                        overflow: "auto",
                    }}>
                        <TextBlock prefix="Weakness: " text={weakness.Reasoning} variant={fontVariant} />
                    </Box>
                </animated.div>
            </NormalCard>
        </animated.div>
    );
}

export default WeaknessCard;