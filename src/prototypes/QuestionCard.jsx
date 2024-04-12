import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { EmphCard } from '../components/Cards';
import { LabeledSlider } from '../components/Sliders';
import { FormControlLabel, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import { TextField } from '@mui/material';


function QuestionCard(props) {
    const {
        claim,
        currentBlockId,
        currentBlockIdSetter,
        currentValueSetter,
        defaultValue,
        questionValid,
        questionValidSetter,
        needExplanation,
        commitLog,
        commitLogSetter,
        scaleFunc,
        disabled = false,
    } = props;

    const [currentDisplayValue, setCurrentDisplayValue] = useState(defaultValue);
    const [textFieldError, setTextFieldError] = useState(false);
    const [textFieldValue, setTextFieldValue] = useState("");

    // useEffect(() => {
    //     setCurrentDisplayValue(defaultValue);
    // }, [currentBlockId]);

    const levalOfSupportFormat = (num) => {
        // return "P = " + (num * 100).toFixed(2) + "%";
        let text = "Uninformative";
        if (num < 1250 - 5000) {
            text = "\u2248 Contradicted";
        }
        else if (num >= 1250 - 5000 && num < 3750 - 5000) {
            text = "\u2248 Mildly Contradicted";
        }
        else if (num >= 3750 - 5000 && num < 6250 - 5000) {
            text =  "\u2248 Uninformative";
        }
        else if (num >= 6250 - 5000 && num < 8750 - 5000) {
            text =  "\u2248 Mildly Supported";
        }
        else {
            text =  "\u2248 Fully Supported";
        }

        return <div>
                <div>{text}</div>
                <div>{(num / 100).toFixed(2) + "%"}</div>
            </div>;
    }

    const validateTextField = () => {
        return textFieldValue.length > 0;
    }

    return (
        <EmphCard>
            <Typography variant="prompt" component="div">
                Reading till this point with the additional information presented in the bolded section, what's your current confidence in the given claim?
            </Typography>
            <Typography variant="question" component="div" sx={{ fontWeight: 'bold' }}>
                Claim: {claim}
            </Typography>
            <Divider variant="middle" sx={{padding: "10px"}} />
            <Box sx={{textAlign: "center"}}>
                <LabeledSlider
                    name={`for-block-${currentBlockId}`}
                    setter={setCurrentDisplayValue}
                    value={currentDisplayValue}
                    defaultValue={defaultValue}
                    scale={scaleFunc}
                    marks={[
                        {
                            value: 0,
                            label: <div className="BottomLabel">Contradicted</div>
                        },
                        {
                            value: 2500,
                            label: <div className="TopLabel">Mildly Contradicted</div>
                        },
                        {
                            value: 5000,
                            label: <div className="BottomLabel">Uninformative</div>
                        },
                        {
                            value: 7500,
                            label: <div className="TopLabel">Mildly Supported</div>
                        },
                        {
                            value: 10000,
                            label: <div className="BottomLabel">Fully Supported</div>
                        }
                    ]}
                    valueLabelFormat={levalOfSupportFormat}
                    disabled={disabled}
                />
                <Box sx={{paddingTop: "10px", maxWidth: "40%"}}>
                    <FormGroup>
                        <FormControlLabel control={
                            <Checkbox checked={!questionValid} onChange={(e) => questionValidSetter(!e.target.checked)} disabled={disabled} />
                        } label="Nonsensical / Unreadable"/>
                    </FormGroup>
                </Box>
                {needExplanation && <Box sx={{textAlign: "center", width: "90%", padding: "10px"}}>
                    <TextField 
                        label="Reason for Modification (Required)"
                        multiline={true}
                        error={textFieldError}
                        value={textFieldValue}
                        onChange={(e) => {setTextFieldValue(e.target.value); setTextFieldError(false)}}
                        helperText={textFieldError ? "Please provide a reason for modification." : ""}
                        sx={{width: "100%"}}
                        disabled={disabled}
                    />
                </Box>}
                <Box sx={{textAlign: "center", paddingTop: "20px"}}>
                    <Button
                        variant="contained"
                        onClick={() => {
                            if (needExplanation && !validateTextField()) {
                                setTextFieldError(true);
                                return;
                            }
                            currentValueSetter(currentDisplayValue);
                            currentBlockIdSetter(currentBlockId + 1);
                            commitLogSetter([...commitLog, {
                                "block_id": currentBlockId,
                                "value": currentDisplayValue,
                                "reason": (' ' + textFieldValue).slice(1),
                            }]);
                            setTextFieldValue("");
                        }}
                        disabled={disabled}
                    >
                        Commit
                    </Button>
                </Box>
            </Box>
        </EmphCard>
    );
}

export default QuestionCard;