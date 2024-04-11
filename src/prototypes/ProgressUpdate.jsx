import { useState } from "react";
import Box from "@mui/material/Box";
import { NormalCard } from "../components/Cards";
import Typography from "@mui/material/Typography";
import { ResponsiveLine } from '@nivo/line';
import { Divider } from "@mui/material";


function ProgressUpdate(props) {
    const {
        blocks,
        numSteps,
        registeredValues,
        currentBlockIdSetter,
        currentValues,
        currentDefaultSetter
    } = props;

    // TODO: Create the data tab that can be applied.
    const registeredValuesExtended = [2500, ...registeredValues];

    const data = [
        {
            "id": "P (pos)",
            "color": "#b3e5fc",
            "data": registeredValuesExtended.map((v, i) => {
                return {
                    "x": i,
                    "y": v / 10000,
                };
            })
        }
    ];

    // TODO: Use the 
    const MyResponsiveLine = ({ data }) => (
        <ResponsiveLine
            data={data}
            curve={"cardinal"}
            margin={{ top: 50, right: 50, bottom: 10, left: 50 }}
            xScale={{ type: 'linear', min: 0, max: numSteps, stacked: false, reverse: false }}
            yScale={{ type: 'linear', min: 0, max: 1, stacked: false, reverse: false }}
            yFormat=" >-.2f"
            tooltip={({ point }) => {
                return (
                    <Box
                        style={{
                            background: 'white',
                            padding: '9px 12px',
                            border: '1px solid #ccc',
                            maxWidth: '100px',
                        }}
                    >
                        <Typography variant="progress" component="div" sx={{paddingBottom: "5px"}}>
                            <b>Content: </b>{point.data.x === 0 ? "(HEAD)" : blocks[point.data.x - 1][0].content.slice(0, 50) + "..."}
                        </Typography>
                        <Divider />
                        <Typography variant="progress" component="div" sx={{paddingTop: "5px"}}>
                            <b>Score: </b>{`${(point.data.y * 100).toFixed(2)}%`}
                        </Typography>
                    </Box>
                )
            }}
            onClick={(point) => {
                const newStepId = point.data.x;
                if (newStepId == 0) {
                    return;
                }
                currentBlockIdSetter(newStepId - 1);
                currentDefaultSetter(currentValues[newStepId - 1]);
                // currentHaveBeenSetSetter();
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={null}
            axisLeft={null}
            pointSize={20}
            pointColor="#b3e5fc"
            pointBorderWidth={2}
            pointBorderColor="#b3e5fc"
            pointLabelYOffset={-20}
            useMesh={true}
            enableGridX={false}
            enableGridY={false}
            animate={false}
            isInteractive={true}
            colors={d => d.color}
            enablePointLabel={false}
        />
    )

    return (
        <Box sx={{padding: "10px"}}>
            <NormalCard>
                <Typography variant="h6" component="div">
                    Progress
                </Typography>
                <Typography variant="prompt" component="div">
                    Click on a circle to go back to that step.
                </Typography>
                <Typography variant="highlightPrompt" component="div">
                    You should only reannotate a step if it's an obvious mistake.
                </Typography>
                <Box sx={{height: "300px"}}>
                    <MyResponsiveLine data={data} />
                </Box>
            </NormalCard>
        </Box>
    );
}

export default ProgressUpdate;