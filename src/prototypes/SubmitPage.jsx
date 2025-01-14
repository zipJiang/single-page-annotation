import { Typography } from "@mui/material";
import "./SubmitPage.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useState } from "react";


function SubmitPage(props) {
    const {
        hoverWeakness,
        setHoverWeakness,
        weaknessIndex,
        setWeaknessIndex,
    } = props;

    return (
        <Box sx={{
            padding: "30px 0px 0px 0px",
        }}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Box sx={{
                        width: "100%",
                    }}>
                        <Button type="submit" variant="contained" color="primary" sx={{
                            width: "100%",
                            borderRadius: "10px",
                        }} onClick={() => {
                            setHoverWeakness(hoverWeakness - 1);
                            setWeaknessIndex(weaknessIndex - 1);
                        }}>
                            <Typography variant="h3">Prev</Typography>
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={8}>
                    <Box sx={{
                        width: "100%",
                    }}>
                        <Button type="submit" variant="contained" color="primary" sx={{
                            width: "100%",
                            borderRadius: "10px",
                        }}>
                            <Typography variant="h3">Submit</Typography>
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default SubmitPage;