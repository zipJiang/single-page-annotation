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
        clustering,
        ratings,
        setRatings,
    } = props;

    const sections = [
        "DESCRIPTIVE",
        "INTERPRETIVE",
        "OVERARCHING",
        "RELATED_WORK",
        "OTHER"
    ]

    const claim_to_index = (claim) => {
        let claim_regex = /^claim(\d+):/i;
        let index = claim.match(claim_regex)[1];
        return parseInt(index) - 1;
    }

    const associated_indices = response['Associated claims'].map((i) => i - 1);

    return (
        <EmphCard sx={{
            margin: "30px",
            height: "500px",
            overflow: "auto"
        }}>
            <Typography variant="h4">
                Claims
            </Typography>
            <br />
            <Box sx={{
            }}>
                {
                    sections.map((section) => {
                        console.log(section);
                        return (
                            <Box key={section}>
                                <Divider>
                                    <Chip label={section} size="small" />
                                </Divider>
                                {
                                    clustering[section].map((claim, cindex) => {
                                        let index = claim_to_index(claim);
                                        return (
                                            <Box key={section + cindex}>
                                                {cindex != 0 && <Divider />}
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
                                                        <Typography variant="body1" component="div">
                                                            {associated_indices.includes(index) && <Chip label="GPT-selected" color="primary" />}
                                                            {" " + claim}
                                                        </Typography>
                                                    </Box>
                                                    <Box sx={{
                                                        order: 2,
                                                        width: "30%"
                                                    }}>
                                                        <FormControl variant="filled" sx={{
                                                            minWidth: "100%"
                                                        }}>
                                                            <InputLabel id={section + cindex + "rating"}>Rating</InputLabel>
                                                            <Select
                                                                labelId={section + cindex + "rating"}
                                                                id={section + cindex}
                                                                onChange={(event) => {
                                                                    const new_ratings = [...ratings];
                                                                    new_ratings[index] = event.target.value;
                                                                    setRatings(new_ratings);
                                                                }}
                                                                value={ratings[index]}
                                                                label="Rating"
                                                                autoWidth
                                                            >
                                                                <MenuItem value={1}>Relevant</MenuItem>
                                                                <MenuItem value={2}>Not Relevant</MenuItem>
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