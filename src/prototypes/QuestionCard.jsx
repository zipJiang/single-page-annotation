import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { EmphCard } from '../components/Cards';
import { FormControlLabel, InputLabel, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import Select from '@mui/material/Select';
import { TextField } from '@mui/material';
import TextBlock from './TextBlock';


function QuestionCard(props) {
    const {
        claims,
        response,
        ratings,
        setRatings,
        gptChecked
    } = props;
    if (!gptChecked) {
        return (
            <EmphCard sx={{
                margin: "30px",
                maxHeight: "60vh",
                overflow: "auto"
            }}>
                <Typography variant="h4">
                    Claims
                </Typography>
                <br />
                <Box sx={{
                }}>
                {
                claims.map((claim, index) => {
                        return (
                            <Box key={index}>
                            <Divider />
                            <Box sx={{
                                padding: "10px",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}>
                                <Box sx={{
                                    order: 1,
                                    width: "60%"
                                }}>
                                    <Typography variant="body1">
                                        {claim}
                                    </Typography>
                                </Box>
                                <Box sx={{
                                    order: 2,
                                    width: "30%"
                                }}>
                                    <FormControl variant="filled" sx={{
                                        minWidth: "100%"
                                    }}>
                                        <InputLabel id={"claim" + index + "rating"}>Rating</InputLabel>
                                        <Select
                                            labelId={"claim" + index + "rating"}
                                            id={"claim" + index}
                                            onChange={(event) => {
                                                const new_ratings = [...ratings];
                                                new_ratings[index] = event.target.value;
                                                console.log(event.target.value);
                                                console.log(new_ratings[index]);
                                                setRatings(new_ratings);
                                            }}
                                            value={ratings[index]}
                                            label="Rating"
                                            autoWidth
                                        >
                                            <MenuItem value={1}>Insufficient Support</MenuItem>
                                            <MenuItem value={2}>I.S. Related Work</MenuItem>
                                            <MenuItem value={3}>Overclaim Other</MenuItem>
                                            <MenuItem value={4}>Other</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Box>
                            </Box>
                        );
                    }
                )}
                </Box>
                <Box sx={{
                    textAlign: "center",
                    padding: "10px"
                }}>
                    <Button type="submit" variant="contained" value="Submit">Submit</Button>
                    {/* <input id="submitButton" classs="btn btn-primary" type="submit" value='Submit' /> */}
                </Box>
            </EmphCard>
        );
    }
    
    // Checked logic
    const covered = new Set();
    response["Weakness associated with claims"].forEach((weakness) => {
        weakness["Associated claims"].forEach((claim) => {
            covered.add(claim);
        });
    })

    // filter down index to only those that are not covered
    const all_indexes = Array.from(Array(claims.length).keys());
    const uncovered = all_indexes.filter((index) => {
        return !(covered.has(index));
    });

    return (
        <EmphCard sx={{
            margin: "30px",
            maxHeight: "60vh",
            overflow: "auto"
        }}>
            <Typography variant="h4">
                Claims
            </Typography>
            <br />
            <Box>
                {
                    response["Weakness associated with claims"].map((w, windex) => {
                        return (
                            <Box key={"weakness:" + windex}>
                                <Divider>
                                    <Chip label={"Weakness " + (windex + 1)}/>
                                </Divider>
                                <Box>
                                    <TextBlock prefix="Reason:" text={w["Reasoning"]} />
                                </Box>
                                <Box>
                                    <TextBlock prefix="GPT Label: " text={w["Label"]} />
                                </Box>
                                {
                                    w["Associated claims"].map((index, cindex) => {
                                        return (
                                            <Box key={"claim:" + cindex}>
                                                <Divider />
                                                <Box sx={{
                                                    padding: "10px",
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                }}>
                                                    <Box sx={{
                                                        order: 1,
                                                        width: "60%"
                                                    }}>
                                                        <Typography variant="body1">
                                                            {claims[index]}
                                                        </Typography>
                                                    </Box>
                                                    <Box sx={{
                                                        order: 2,
                                                        width: "30%"
                                                    }}>
                                                        <FormControl variant="filled" sx={{
                                                            minWidth: "100%"
                                                        }}>
                                                            <InputLabel id={"claim" + index + "rating"}>Rating</InputLabel>
                                                            <Select
                                                                labelId={"claim" + index + "rating"}
                                                                id={"claim" + index}
                                                                onChange={(event) => {
                                                                    const new_ratings = [...ratings];
                                                                    new_ratings[index] = event.target.value;
                                                                    console.log(event.target.value);
                                                                    console.log(new_ratings[index]);
                                                                    setRatings(new_ratings);
                                                                }}
                                                                value={ratings[index]}
                                                                label="Rating"
                                                                autoWidth
                                                            >
                                                                <MenuItem value={1}>Insufficient Support</MenuItem>
                                                                <MenuItem value={2}>I.S. Related Work</MenuItem>
                                                                <MenuItem value={3}>Overclaim Other</MenuItem>
                                                                <MenuItem value={4}>Other</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        );
                                    })
                                }
                                <Divider>
                                    <Chip label={"Others"}/>
                                </Divider>
                                {
                                    uncovered.map((index, cindex) => {
                                        return (
                                            <Box key={"claim:" + cindex}>
                                                {(cindex != 0) && <Divider />}
                                                <Box sx={{
                                                    padding: "10px",
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                }}>
                                                    <Box sx={{
                                                        order: 1,
                                                        width: "60%"
                                                    }}>
                                                        <Typography variant="body1">
                                                            {claims[index]}
                                                        </Typography>
                                                    </Box>
                                                    <Box sx={{
                                                        order: 2,
                                                        width: "30%"
                                                    }}>
                                                        <FormControl variant="filled" sx={{
                                                            minWidth: "100%"
                                                        }}>
                                                            <InputLabel id={"claim" + index + "rating"}>Rating</InputLabel>
                                                            <Select
                                                                labelId={"claim" + index + "rating"}
                                                                id={"claim" + index}
                                                                onChange={(event) => {
                                                                    const new_ratings = [...ratings];
                                                                    new_ratings[index] = event.target.value;
                                                                    console.log(event.target.value);
                                                                    console.log(new_ratings[index]);
                                                                    setRatings(new_ratings);
                                                                }}
                                                                value={ratings[index]}
                                                                label="Rating"
                                                                autoWidth
                                                            >
                                                                <MenuItem value={1}>Insufficient Support</MenuItem>
                                                                <MenuItem value={2}>I.S. Related Work</MenuItem>
                                                                <MenuItem value={3}>Overclaim Other</MenuItem>
                                                                <MenuItem value={4}>Other</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        );
                                    })
                                }
                            </Box>
                        );
                    })
                }
            </Box>
            <Box sx={{
                textAlign: "center",
                padding: "10px"
            }}>
                <Button type="submit" variant="contained" value="Submit">Submit</Button>
                {/* <input id="submitButton" classs="btn btn-primary" type="submit" value='Submit' /> */}
            </Box>
        </EmphCard>
    );
}

export default QuestionCard;