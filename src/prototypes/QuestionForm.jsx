import React, { useState } from 'react';
import AbstractViewer from './AbstractViewer';
import QuestionCard from './QuestionCard';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import { EmphCard } from '../components/Cards';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ReviewerViewer from './ReviewViewer';


function QuestionForm(props) {
    const {
        theme,
        payload,
        ratings,
        setRatings
    } = props;

    // const [gptChecked, setGptChecked] = useState(false);
    // const handleChange = (event) => {
    //     setGptChecked(event.target.checked);
    //   };

    return (
        <Box sx={{
        }}>
            <Grid container spacing={2}>
                <Grid item xs={5}>
                    <AbstractViewer payload={payload} />
                    <Box sx={{
                        margin: 0,
                        padding: 0,
                        height: "10vh",
                        textAlign: "center",
                    }}>
                        <Box sx={{marginTop: "10px", padding: "0px", display: "flex", justifyContent: "space-around"}}>
                            <Box sx={{
                                order: 1,
                            }}>
                            <Button
                                type="button"
                                variant='contained' color='primary'
                                onClick={() => window.open("https://" + payload.pdf, '_blank')}
                            >
                                <Typography variant='h6'>
                                    Show pdf
                                </Typography>
                            </Button>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={7}>
                    <ReviewerViewer payload={payload} />
                    <QuestionCard
                        claims={payload.meta.claims}
                        response={payload.response}
                        clustering={payload["Clustered claims"]}
                        ratings={ratings}
                        setRatings={setRatings}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

export default QuestionForm;